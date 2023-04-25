onUiLoaded(nos_browser_start_it_up);

let currentImgSrc = null;
let currentImgIndex = null;

const mockImgs = [
  "https://study-image.nosdn.127.net/outputs/txt2img-images/2023-04-25/00009-1144394986.png?imageView&quality=100",
	"https://study-image.nosdn.127.net/50dc0ebb8bbc49c4958dbcdff638ae02.png?imageView&quality=100",
	"https://study-image.nosdn.127.net/6d18e56968d34e7dac5b980d0c17cf22.png?imageView&quality=100",
  "https://study-image.nosdn.127.net/outputs/txt2img-images/2023-04-25/00008-397633960.png?imageView&quality=100",
  "https://study-image.nosdn.127.net/outputs/txt2img-images/2023-04-25/00010-1197403384.png?imageView&quality=100",
  "https://study-image.nosdn.127.net/outputs/txt2img-images/2023-04-25/00011-2695844060.png?imageView&quality=100",
  "https://study-image.nosdn.127.net/outputs/txt2img-images/2023-04-25/00012-1554648978.png?imageView&quality=100",
  "https://study-image.nosdn.127.net/outputs/txt2img-images/2023-04-25/00013-2006833999.png?imageView&quality=100",
  "https://study-image.nosdn.127.net/outputs/txt2img-images/2023-04-25/00014-2006833999.png?imageView&quality=100"
];

function observeTabShow(targetElement, cb) {
	// 创建观察者回调
	const observerCallback = (mutationsList, observer) => {
		for (const mutation of mutationsList) {
			if (
				mutation.type === "attributes" &&
				mutation.attributeName === "style"
			) {
				cb()
			}
		}
	};

	// 创建观察者实例
	const observer = new MutationObserver(observerCallback);

	// 配置观察选项
	const observerConfig = {
		attributes: true, // 监听属性变化
		attributeFilter: ["style"], // 监听样式变化
	};

	// 开始观察元素
	observer.observe(targetElement, observerConfig);
}

{/* <div class=\"ux_nos_modal_prev_btn\">prev</div> */}
{/* <div class=\"ux_nos_modal_next_btn\">next</div> */}

async function nos_browser_start_it_up() {
	$tabNode = gradioApp().getElementById("tab_nos_history_browser");
	$container = gradioApp().getElementById("j_nos_html");
	$maskNode = gradioApp().getElementById("j_nos_modal_mask");
	$btnNode = gradioApp().getElementById("j_nos_fake_btn");
  $modalCnt = gradioApp().getElementById("j_nos_modal_cnt");

  let imgList = mockImgs;
  // 
  const dropFilterNode = document.createElement("div");
  const dropFilterImgNode = document.createElement("img");
  const dropFilterPNode = document.createElement("p");
  dropFilterNode.classList.add("ux_nos_mask_drop", "ux_nos_mask_drop_fill");
  dropFilterImgNode.classList.add("ux_nos_mask_drop_img");
  dropFilterPNode.classList.add("ux_nos_mask_drop_p", "ux_nos_mask_drop_fill");
  dropFilterNode.appendChild(dropFilterImgNode);
  dropFilterNode.appendChild(dropFilterPNode);
  $maskNode.appendChild(dropFilterNode);

  function showModal(imgIndex) {
    if(imgIndex !== currentImgIndex){
      currentImgIndex = imgIndex;
      currentImgSrc = imgList[imgIndex];
      dropFilterImgNode.src = currentImgSrc;
      $btnNode.click();
    }
    $maskNode.classList.remove("ux_nos_mask_hide");
  }

  // 上一下一按钮
  const prevBtn = document.createElement("a");
  prevBtn.innerText = "\u2B05";
  prevBtn.classList.add("ux_nos_mask_tBtn", "ux_nos_mask_prevBtn")
  prevBtn.addEventListener('click', function () {
    showModal(Math.max(0, currentImgIndex - 1));
  });

  const nextBtn = document.createElement("a");
  nextBtn.innerText = "\u2B05";
  nextBtn.classList.add("ux_nos_mask_tBtn", "ux_nos_mask_nextBtn")
  nextBtn.addEventListener('click', function () {
    showModal(Math.min(imgList.length - 1, currentImgIndex + 1));
  });

  $modalCnt.appendChild(prevBtn);
  $modalCnt.appendChild(nextBtn);

  // 图片
	$container.innerHTML = `<div class="grid" id="j_masonry_box">${mockImgs.map(
		(x,i) =>
			`<div class="grid-item"><img class="grid-item_img" data-index="${i}" src="${x}" /></div>`,
	)}</div>`;

	$container.addEventListener("click", async function (evt) {
		if (evt.target.tagName === "IMG") {
			showModal(evt.target.dataset.index);
			return;
		}
	});

  // 瀑布流图片
	const elem = gradioApp().getElementById("j_masonry_box");
	const msnry = new Masonry(elem, {
		// options
		itemSelector: ".grid-item",
		columnWidth: 350,
    gutter: 20
	});

  observeTabShow($tabNode, function () {
    msnry.layout();
  })
}

function nos_fake_img() {
	return [currentImgSrc];
}

function nos_close_modal() {
	$maskNode.classList.add("ux_nos_mask_hide");
	return [];
}
