function carouselimg(opt) {
    /*
        需求：
            * 自动轮播：开启定时器切换图片
            * 点击左右按钮可以切换图片
            * 点击焦点可以切换对应图片
            * <div id="box">最大盒子
                            position: relative;
                            overflow: hidden;
                <ul class="imglist">无宽高定位设置
                    <!-- <li><img src="../images/pic1.jpg" alt=""></li> -->  position: absolute;
                </ul>
                <p class="light">
                    <!-- <span></span> -->
                 </p>
                <div class="posibtn">
                    <p class="prev">&lt;</p>
                    <p class="next">&gt;</p>
                </div>
            </div>
    */

    let dafaultData = {//可选项,用默认参数
        time: 2,
        imgdate: [],//配置参数必填
        ele: 'box'//最外层盒子Id名 
    }

    Object.assign(dafaultData, opt);//用默认参数

    // 变量声明
    let box = document.getElementById(dafaultData.ele);
    let list = box.getElementsByClassName('imglist')[0];
    let light = box.getElementsByClassName('light')[0];
    let prevBtn = box.getElementsByClassName('prev')[0];
    let nextBtn = box.getElementsByClassName('next')[0];
    let date = dafaultData.imgdate;
    let timer = null;
    let time = dafaultData.time * 1000;
    let num = 0;



    //1、渲染图片
    let str = date.map(item => {
        return `<li><img src="images/${item}" alt=""></li>`
    }).join('');
    list.innerHTML = str;

    //2、把渲染后的节点声明
    let imglist = list.getElementsByTagName('li');
    let iw = imglist[0].offsetWidth;//每次轮播的一张图片的距离


    //3、全部图片右边等待，以一张图进入box可视区
    for (let ele of imglist) {
        ele.style.left = iw + 'px';
    }
    imglist[0].style.left = 0 + 'px';

    //4、开启定时器，默认轮播
    // timer = setInterval(next, time);

    //5、移入轮播暂停
    box.onmouseover = () => {
        clearInterval(timer)
    }

    //6、移出恢复轮播
    box.onmouseout = () => {
        timer = setInterval(next, time);
    }
    //7、点击下一页图
    nextBtn.onclick = () => {
        next()
    }
    //8、点击上一页图
    prevBtn.onclick = () => {
        prev()
    }

    function prev() {
        //旧图挪走
        console.log(num)
        startMove(imglist[num], { 'left': iw });
        //新图进场
        num--;
        num = num < 0 ? imglist.length - 1 : num;
        imglist[num].style.left = -iw + 'px';
        startMove(imglist[num], { 'left': 0 });
        point()
    }

    function next() {
        //旧图挪走
        startMove(imglist[num], { 'left': -iw });
        //新图进场
        num++;
        num = num > imglist.length - 1 ? 0 : num;
        imglist[num].style.left = iw + 'px'
        startMove(imglist[num], { 'left': 0 });
        point()

    }

    //渲染焦点
    let html = '';
    for (let i = 0; i < imglist.length; i++) {
        html += `<span>${i + 1}</span>`
    }
    light.innerHTML = html;
    light.children[0].className = 'active';

    //焦点跟随
    function point() {
        for (var i = 0; i < imglist.length; i++) {//排他
            light.children[i].className = ''
        }
        light.children[num].className = 'active';//高亮
    }

    light.onclick = (ev) => {//元素委托，点击焦点切换图片
        console.log(num)
        if (ev.target.tagName.toLowerCase() == 'span') {
            let index = ev.target.innerHTML - 1;
            if (index > num) {
                //新图从右侧进入
                //旧图挪走
                startMove(imglist[num], { 'left': -iw });
                imglist[index].style.left = iw + 'px';
                startMove(imglist[index], { 'left': 0 });
            }
            if (index < num) {
                //新图从左侧进入
                startMove(imglist[num], { 'left': iw });
                imglist[index].style.left = -iw + 'px';
                startMove(imglist[index], { 'left': 0 });
            }

            num = index;
            point();
        }
    }


}
