import gradio as gr

from modules import paths, shared, script_callbacks, scripts, images
from modules.shared import opts, cmd_opts
from modules.call_queue import wrap_gradio_call

import modules.generation_parameters_copypaste as parameters_copypaste

def run_pnginfo(image):
    if image is None:
        return '', '', ''

    geninfo, items = images.read_info_from_image(image)
    # items = {**{'parameters': geninfo}, **items}
    res = geninfo.split('\n');

    data = {}
    for s in res[2].split(','):
        key, value = s.split(':')
        data[key.strip()] = value.strip()

    return geninfo, res[0], res[1], data['Model'], data['Size'], data['CFG scale'], data['Sampler'], data['Steps'], data['Seed']

def on_ui_tabs():
    with gr.Blocks(analytics_enabled=False) as image_browser:
        html = gr.HTML(elem_id="j_nos_html", elem_classes="ux_nos_html")

        with gr.Column(variant='panel', elem_id="j_nos_modal_mask", elem_classes="ux_nos_mask ux_nos_mask_hide"): #
            with gr.Row(elem_id="j_nos_modal_cnt",):
                with gr.Column():
                    image = gr.Image(elem_id="j_nos_img", elem_classes="ux_nos_img", interactive=False, type="pil", value="http://study-image.nosdn.127.net/50dc0ebb8bbc49c4958dbcdff638ae02.png")
                    fakeBtn = gr.Button(elem_id="j_nos_fake_btn", value="Fake btn", visible=False)
                    fakeBtn.click(
                        _js="nos_fake_img",
                        preprocess=False,
                        fn=lambda x: x,
                        inputs=[],
                        outputs=[image]
                    )
                    
                    gr.HTML(elem_id="j_nos_image_edit", elem_classes="ux_nos_image_edit", value="<a>收藏</a>")

                with gr.Column():
                    btn = gr.Button(value="X")
                    btn.click(
                        _js="nos_close_modal",
                        fn=None,
                        inputs=[],
                        outputs=[]
                    )

                    # btn = gr.Button(value="Get PNG Info")
                    generation_info = gr.Textbox(visible=False, elem_id="j_nos_generation_info")

                    promot_info = gr.Textbox(label="提示词")
                    negative_promot_info = gr.Textbox(label="否定提示词")

                    with gr.Column():
                        with gr.Row():
                            modal_info = gr.Textbox(label="图像模型")
                            size_info = gr.Textbox(label="图像尺寸")
                    with gr.Column():
                        with gr.Row():
                            cfg_info = gr.Textbox(label="提示词相关性")
                            sample_info = gr.Textbox(label="采样器")
                    with gr.Column():
                        with gr.Row():
                            sample_step_info = gr.Textbox(label="采样步长")
                            seed_info = gr.Textbox(label="随机种子")

                    image.change(run_pnginfo, inputs=[image], outputs=[
                        generation_info,
                        promot_info,
                        negative_promot_info,
                        modal_info,
                        size_info,
                        cfg_info,
                        sample_info,
                        sample_step_info,
                        seed_info
                    ])

                    # buttons = parameters_copypaste.create_buttons(["txt2img", "img2img", "inpaint", "extras"])
                    rebtn = gr.Button(value="重新生成")
                    parameters_copypaste.register_paste_params_button(parameters_copypaste.ParamBinding(
                        paste_button=rebtn, tabname="txt2img", source_text_component=generation_info, source_image_component=image,
                    ))

    return (image_browser, "创建历史", "nos_history_browser"),


script_callbacks.on_ui_tabs(on_ui_tabs)