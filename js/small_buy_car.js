function small_buy_car(use_name) {
    //购物车
    if (use_name) {
        let huoqu_shop_id = new Promise(resolved => {//登录状态下，能看到购物车内容
            $.ajax({
                type: 'get',
                url: '../api/gouwuche.php',
                data: {
                    use_name: use_name
                },
                success: str => {
                    let shop_main_arr = JSON.parse(str);
                    resolved(shop_main_arr);
                }
            })
        });

        huoqu_shop_id.then(shop_main_arr => {//获取shop_uid
            var uid_arr = [];
            var many_number = [];
            var shuliang_a = 0;
            $('.zongji_number').html(shop_main_arr.length)//获取数据是，渲染购物车里面的商品总数量
            var shop_uid = shop_main_arr.map(function (item) {
                uid_arr.push(item.shop_uid);
                many_number.push(item.shop_many);

            });

            // 小购物车里，商品的总量
            let small_zongliang = sumArr(many_number);

            function sumArr(many_number) {
                return eval(many_number.join("+"))
            }
            $('.gongji i').html(small_zongliang);
            $('.buycar .buy_arr').html(small_zongliang)





            for (var i = 0; i < uid_arr.length; i++) {//遍历获取到的商品uid，通过循环，不断调用ajax得到商品数据
                let aaaa = many_number[i];//一起循环每个商品的数量
                $.ajax({
                    type: 'get',
                    url: '../api/xiangqing.php',
                    data: {
                        uid: uid_arr[i]
                    },
                    success: str => {//每条商品的信息
                        let juti_shop = JSON.parse(str);
                        var key = 'number_number';//为该条商品信息添加该商品数量
                        juti_shop[0][key] = aaaa;
                        chulai((juti_shop[0].now_price) * (juti_shop[0].number_number));
                        let bianli = juti_shop.map(function (item) {//遍历得到的数据，将其渲染到页面中
                            var reg = /200x200/g;
                            var ss = (item.big_img).replace(reg, '80x80');
                            return ` <li data-id="${item.uid}">
                                    <img src="${item.big_img}" alt="">
                                    <span class="shop_name_small_car">${item.list_name}</span>
                                    <div class="shuliang">
                                        <span>${item.now_price}</span><i>元*</i>
                                        <span class="shuliang_aaa">${item.number_number}</span>
                                    </div>
                                    <span class="shanchu_lie">X</span>
                                </li>
                        `;

                        }).join('');
                        $('.one_first').append(bianli);//渲染li 
                    }
                });
            }
        });
    }


    //删除当行与删除数据库
    $('.one_first').on('click', '.shanchu_lie', function () {
        $(this).parent().remove();
        let shanchu_shop = $(this).parent().attr('data-id');

        //删除小购物车里的数量
        let shuliangaaa = $(this).prev().children().eq(2).html();
        let shuliangbbb = $('.gongji i').html() - shuliangaaa;
        $('.gongji i').html(shuliangbbb);
        $('.buycar .buy_arr').html(shuliangbbb);
        //删除商品，对应总价也减少
        let zongjiaaaa = $(this).prev().children().eq(0).html();
        let chajia = (shuliangaaa * 1) * (zongjiaaaa * 1);
        let chajia2 = $('.zuihoujiage').html();
        let zzz = chajia2 - chajia
        $('.zuihoujiage').html(zzz)


        $.ajax({
            type: 'get',
            url: '../api/shanchu.php',
            data: {
                use_name: use_name,
                shop_uid: shanchu_shop
            }
        })
    });
    //显示商品总价
    var zbbb = 0;
    function chulai(azzz) {
        zbbb += azzz;
        $('.zuihoujiage').html(zbbb)
    };

    //点击跳转到购物车
    $('.quba_cai').click(function () {
        window.open('gouwuche.html?');
    });

}