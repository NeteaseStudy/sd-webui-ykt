from PIL import Image, PngImagePlugin
import nos
import io
import os
from modules import script_callbacks
from modules.shared import opts

access_key = os.environ.get('NOS_ACCESS_KEY')
secret_key = os.environ.get('NOS_SECRET_KEY')
end_point = os.environ.get('NOS_END_POINT')

client = nos.Client(
    access_key,
    secret_key,
    end_point=end_point,
    num_pools=10,
    timeout=5,
    max_retries=1,
    # enable_ssl=True
)

# image = Image.open("/Users/shaoyuyun/Documents/Github/stable-diffusion-webui/outputs/txt2img-images/2023-04-24/00019-3115671917.png")
# object_lists = client.list_objects(
#     bucket="study-image",
# )
# for object_list in object_lists["response"].findall("Contents"):
#         print(object_list.find("Key").text)


# def on_before_image_saved():
#     return;

def gen_nos_key(filename):
    return filename

def on_image_saved(params):
    image_byte_io = io.BytesIO()

    pnginfo_data = PngImagePlugin.PngInfo()
    if opts.enable_pnginfo:
        for k, v in params.pnginfo.items():
            pnginfo_data.add_text(k, str(v))
    params.image.save(image_byte_io, format="PNG", pnginfo=pnginfo_data)
    image_byte_io.seek(0)
    binary_image_data = image_byte_io.getvalue()

    resp = client.put_object(
        bucket="study-image",
        key=gen_nos_key(params.filename),
        body=binary_image_data
    )

    print(f'upload image: {params.filename}')

    return

if access_key:
    # script_callbacks.on_before_image_saved(on_before_image_saved)
    script_callbacks.on_image_saved(on_image_saved)

