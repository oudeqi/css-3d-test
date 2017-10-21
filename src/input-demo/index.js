import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

var pinyin = require("pinyin");

var data = [
	{"id":1,"name":"涂小花1","department":"产品部","gw":"部门经理","checked":false,"link":false},
	{"id":2,"name":"涂小花2","department":"产品部","gw":"职员","checked":false,"link":false},
	{"id":3,"name":"涂小花3","department":"设计部","gw":"职员","checked":false,"link":false},
	{"id":4,"name":"涂小花4","department":"设计部","gw":"职员","checked":false,"link":false},
	{"id":5,"name":"涂小花5","department":"策划部","gw":"职员","checked":false,"link":false},
	{"id":6,"name":"涂小花6","department":"策划部","gw":"总经理","checked":false,"link":false},
	{"id":7,"name":"涂小花7","department":"游戏部","gw":"部门经理","checked":false,"link":false},
	{"id":8,"name":"涂小花8","department":"游戏部","gw":"部门经理","checked":false,"link":false},
	{"id":9,"name":"涂小花9","department":"市场部","gw":"部门经理","checked":false,"link":false},
	{"id":10,"name":"张小花10","department":"市场部","gw":"部门经理","checked":false,"link":false},
	{"id":11,"name":"张涂小花11","department":"编辑部","gw":"运营总监","checked":false,"link":false},
	{"id":12,"name":"张涂小花12","department":"编辑部","gw":"运营总监","checked":false,"link":false},
	{"id":13,"name":"张涂小花13","department":"产品部","gw":"运营总监","checked":false,"link":false},
	{"id":14,"name":"李涂小花14","department":"产品部","gw":"总经理","checked":false,"link":false},
	{"id":15,"name":"李涂小花15","department":"产品部1","gw":"总经理","checked":false,"link":false},
	{"id":16,"name":"李涂小花16","department":"产品部1","gw":"总经理","checked":false,"link":false},
	{"id":17,"name":"涂小花17","department":"产品部2","gw":"总经理","checked":false,"link":false},
	{"id":18,"name":"涂小花18","department":"产品部2","gw":"总经理","checked":false,"link":false},
	{"id":19,"name":"涂小花19","department":"产品部3","gw":"总经理","checked":false,"link":false},
	{"id":20,"name":"涂小花20","department":"产品部3","gw":"总经理","checked":false,"link":false},
	{"id":21,"name":"涂小花21","department":"产品部4","gw":"总经理","checked":false,"link":false},
	{"id":22,"name":"涂小花22","department":"产品部4","gw":"总经理","checked":false,"link":true},
	{"id":23,"name":"涂小花23","department":"产品部5","gw":"总经理","checked":false,"link":true},
	{"id":24,"name":"涂小花24","department":"产品部5","gw":"总经理","checked":false,"link":true},
	{"id":25,"name":"涂小花25","department":"产品部6","gw":"总经理","checked":false,"link":true},
	{"id":26,"name":"涂小花26","department":"产品部6","gw":"总经理","checked":false,"link":true}
];

var allBM = [];
var allGW = [];

for (var i=0;i<data.length;i++) {
	if($.inArray(data[i].department,allBM) == -1){
		allBM.push(data[i].department);
	}
	if($.inArray(data[i].gw,allGW) == -1){
		allGW.push(data[i].gw);
	}
}


function produceUl_02(list){
	
	var has = false;
	var ul2Str = '<li class="item tip">请输入同事名字的拼音</li>';
	ul2Str += '<li class="item tit"><span class="glyphicon glyphicon-user"></span><strong>人员</strong></li>';
	for (var i=0;i<list.length;i++) {
		if(list[i].checked == false){

			var name = list[i].name;
			var name2 = '';
			for (var j = 0 ;j<name.length;j++) {
				name2 += pinyin(name[j])[0][0];
			}
			if(name2.indexOf($.trim($('.ul-01-ipt').val())) >= 0){
				has = true;
				ul2Str += '<li class="item unchecked" data-id="'+list[i].id+'">'
				ul2Str += '<a class="trigger" href="javascript:void(0);">'+list[i].name+'</a>'
				ul2Str += '</li>'
			}
		}
	}
	if(has){
		$('.ul-02').html(ul2Str);
		$('.ul-02 .item.unchecked').first().find('a').addClass('active');
	}else{
		$('.ul-02').html('<li class="item tip">没有查询到数据</li>');
	}
	
	$('.ul-02').show();
}
			
function changeListStatesById(id,states){
	for (var i=0;i<data.length;i++) {
		if(data[i].id == id){
			data[i].checked = states;
		}
	}
}
function getListStatesById(id){
	for (var i=0;i<data.length;i++) {
		if(data[i].id == id){
			return data[i].checked;
		}
	}
}


//点击输入框组件以外，出现灰色边框、列表影藏
$(document).click(function(e){
	//e.stopPropagation();
	console.log($(e.target).parents('.srk'));
	if($(e.target).parents('.srk').attr('role') != 'srk' && e.target.className != 'trigger' && e.target.className != 'del'){
		$('.srk').css({"box-shadow": "0px 0px 0px #DDDDDD","border":"1px solid #dddddd"});
		$('.ul-02').hide().html('');
		$('.srk .secl-panel').hide();
		$('.ul-01-ipt').val('');
		$('.srk .ul-01 .item .secl-catagray').removeClass('active');
		if($('.ul-01 .item.checked').length == 0){
			$('.ul-01 .tip').show();
		}
	}
});

			
//点击ul-01 产生ul-02列表
$('.ul-01').click(function(e){
	if($(e.target).attr('class').toLowerCase().indexOf('ul-01') >= 0){
		$('.ul-01-ipt').val('');
		$('.ul-01 .tip').hide();
		$('.ul-01-ipt').focus();
		$('.srk').css({"box-shadow": "0px 0px 5px #DDDDDD","border":"1px solid deepskyblue"});
		$('.srk .secl-panel').hide();
		$('.srk .ul-01 .item .secl-catagray').removeClass('active');
		produceUl_02(data);
	}
	
});

//类别选择
$('.srk .ul-01 .item .secl-catagray').click(function(){
	$('.ul-01-ipt').val('');
	$('.ul-01-ipt').focus();
	$('.ul-02').hide().html('');
	
	$('.ul-01 .tip').hide();
	
	if($(this).hasClass('active')){
		$('.srk').css({"box-shadow": "0px 0px 0px #DDDDDD","border":"1px solid #dddddd"});
		$(this).removeClass('active');
		$('.srk .secl-panel').hide();
		if($('.ul-01 .item.checked').length == 0){
			$('.ul-01 .tip').show();
		}
		$('.ul-01-ipt').blur();
	}else{
		$('.srk').css({"box-shadow": "0px 0px 5px #DDDDDD","border":"1px solid deepskyblue"});
		$(this).addClass('active');
		$('.srk .secl-panel').show();
		refreshPanel();
	}
});

//清除所有
$('.srk .ul-01 .item .clear-all-secl').click(function(){
	//清除模型
	for (var i=0;i<data.length;i++) {
		data[i].checked = false;
	}
	//删除 ul-01
	$('.srk .ul-01 .checked').remove();

	//其他效果
	$('.srk').css({"box-shadow": "0px 0px 0px #DDDDDD","border":"1px solid #dddddd"});
	$('.srk .ul-01 .tip').show();
	$('.ul-01-ipt').val('');
	$('.ul-02').hide().html('');
	refreshPanel();
});


function delUl_01(id){
	$('.srk .ul-01 .item.checked[data-id="'+id+'"]').remove();
	$('.ul-01-ipt').focus();
	if($('.ul-01 .item.checked').length == 0){
		$('.ul-01 .tip').show();
		$('.ul-01-ipt').blur();
		$('.srk').css({"box-shadow": "0px 0px 0px #DDDDDD","border":"1px solid #dddddd"});
	}
	
	//refreshPanel();
}

function produceUl_01(id,name){
	$('.srk .ul-01 .tip').hide();
	var checked = '';
	checked += '<li class="item checked" data-id="'+id+'">';
	checked += '<a class="trigger" href="javascript:void(0);">';
	checked += '<span class="move">';
	checked += '<i class="icon glyphicon glyphicon-user"></i>';
	checked += '<strong class="name">'+name+'</strong>';
	checked += '</span>';
	checked += '<span class="del">&times;</span>';
	checked += '</a>';
	checked += '</li>';
	$('.ul-01 .item.ipt-box').before(checked);
	$('.ul-02').hide().html('');
	$('.ul-01-ipt').val('');
	$('.ul-01-ipt').focus();
	$('.srk').css({"box-shadow": "0px 0px 5px #DDDDDD","border":"1px solid deepskyblue"});
	$('.srk .ul-01 .item .trigger.delete').removeClass('delete');
	//refreshPanel();
}
			
//点击ul-02列表项、生成ul-01
$('.ul-02').on('click','.item',function(){
	$('.ul-01 .tip').hide();
	if($(this).hasClass('unchecked')){
		var id = $(this).attr('data-id');
		var name = $(this).text();
		changeListStatesById(id,true);
		produceUl_01(id,name);
	}
})
			
$('.ul-02').on('mouseenter','.item',function(){
	$('.ul-02').find('.active').removeClass('active');
});
			
//删除ul-01中选中的
$('.ul-01').on('click','.item.checked .del',function(){
	$('.srk .ul-01 .item .trigger.delete').removeClass('delete');
	var parent = $(this).parents('.checked');
	var id = parent.attr('data-id');
	parent.remove();
	changeListStatesById(id,false);
	
	$('.ul-01-ipt').focus();
	$('.srk').css({"box-shadow": "0px 0px 5px #DDDDDD","border":"1px solid deepskyblue"});
	if($('.ul-01 .item.checked').length == 0){
		$('.ul-01 .tip').show();
		$('.ul-01-ipt').blur();
		$('.srk').css({"box-shadow": "0px 0px 0px #DDDDDD","border":"1px solid #dddddd"});
	}
	$('.ul-02').hide().html('');
	$('.ul-01-ipt').val('');
	refreshPanel();
})
			
//监听鼠标输入
$('.ul-01-ipt').keyup(function(e){
	if($(this).val() == ''){
		if(e.keyCode != 32 && e.keyCode != 8){
			return;
		}
		if(e.keyCode == 32 ){
			$('.srk .secl-panel').hide();
			$('.srk .ul-01 .item .select-trigger.active').removeClass('active');
			if($(this).val().length >= 7){
				$(this).val($(this).val().substring(0,6));
			}
			produceUl_02(data);
			$('.srk .ul-01 .item .trigger.delete').removeClass('delete');
			return;
		}
		if(e.keyCode == 8){
			
			var last = $('.srk .ul-01 .item.checked').last();
			if(last.children().hasClass('delete')){
				changeListStatesById(last.attr('data-id'),false);
				last.remove();
				refreshPanel();
			}else{
				last.children().addClass('delete');
			}
			$('.srk .secl-panel').hide();
			$('.srk .ul-01 .item .select-trigger.active').removeClass('active');
			if($(this).val().length >= 7){
				$(this).val($(this).val().substring(0,6));
			}
			produceUl_02(data);

		}

	}else{
		$('.srk .ul-01 .item .trigger.delete').removeClass('delete');
		$('.srk .secl-panel').hide();
		$('.srk .ul-01 .item .select-trigger.active').removeClass('active');
		if($(this).val().length >= 7){
			$(this).val($(this).val().substring(0,6));
		}
		produceUl_02(data);
	}
	
	
	
});
			
//选中所有
$('.secl-panel').on('click','.list .tit .trigger',function(e){
	var lists = $(this).parents('.list').find('.trigger[data-id]');
	if($(this).hasClass('active')){
		$(this).removeClass('active');
		$(this).find('.states').hide();
		lists.find('.states').hide();
		for(var i=0;i<lists.length;i++){
			var id = parseInt(lists.eq(i).attr('data-id'));
			var name = $.trim(lists.eq(i).find('.name').text());
			//改变模型
			changeListStatesById(id,false);
			//删除dom
			delUl_01(id);
		}
	}else{
		$(this).addClass('active');
		$(this).find('.states').show();
		lists.find('.states').show();
		for(var i=0;i<lists.length;i++){
			var id = parseInt(lists.eq(i).attr('data-id'));
			var name = $.trim(lists.eq(i).find('.name').text());
			//改变模型
			changeListStatesById(id,true);
			//添加dom
			delUl_01(id);
			produceUl_01(id,name);
		}
	}
});

//复选框选中
$('.secl-panel').on('click','.list .item .trigger',function(e){
	var id = $(this).attr('data-id');
	var name = $.trim($(this).find('.name').text());
	var flag = getListStatesById(id);		
	if(flag){
		$(this).find('.states').hide();
		changeListStatesById(id,false);
		delUl_01(id);
	}else{
		$(this).find('.states').show();
		changeListStatesById(id,true);	
		produceUl_01(id,name);
	}

});

var currentCategray = ''; //选中的分类
var currentBM = ''; //选中的部门
var currentGW = ''; //选中的岗位

function refreshPanel(){
	
	if(currentCategray == ''){currentCategray = 'bm';}

	if(currentCategray == 'bm'){
		$('.srk .secl-panel .catagray').find('.tit .name').text('部门');
		produceBM();
	}
	if(currentCategray == 'gw'){
		$('.srk .secl-panel .catagray').find('.tit .name').text('岗位');
		produceGW();
	}
	if(currentCategray == 'link'){
		$('.srk .secl-panel .catagray').find('.tit .name').text('常用联系人');
		produceLink();
	}

}
function produceLink(){
	
	$('.secl-panel .list .tit .trigger').removeClass('active').find('.states').hide();
	$('.srk .secl-panel .catagray').find('.item').remove();
	$('.srk .secl-panel .list .item').remove();
	for(var i=0;i<data.length;i++){
		if(data[i].link == true){
			var str = '';
			str += '<li class="item">';
			str += '<a href="javascript:void(0);" class="trigger" data-id="'+data[i].id+'">';
			str += '<div class="checkbox-box">';
			if(data[i].checked == true){
				str += '<div class="states" style="display:block;"></div>';
			}else{
				str += '<div class="states"></div>';
			}
			str += '</div>';
			str += '<div class="img-box">';
			str += '</div>';
			str += '<div class="name">'+data[i].name+'</div>';
			str += '</a>';
			str += '</li>';
			$('.srk .secl-panel .list').append(str);
		}
	}
}

function produceBM(){
	$('.srk .secl-panel .catagray').find('.item').remove();
	for(var i=0;i<allBM.length;i++){
		var str = '';
		str += '<li class="item">';
		str += '<span class="glyphicon glyphicon-list-alt icon"></span>';
		str += '<a href="javascript:void(0);" class="name bm">'+allBM[i]+'</a>';
		str += '</li>';
		$('.srk .secl-panel .catagray').append(str);
	}
	if(currentBM == ''){currentBM = allBM[0];}
	var allBMDom = $('.srk .secl-panel .catagray .item .name');
	
	for(var k=0;k<allBMDom.length;k++){
		if($.trim(allBMDom.eq(k).text()) == currentBM){
			allBMDom.eq(k).addClass('active');
		}
	}
	getPeopleByBM();
}
function produceGW(){
	$('.srk .secl-panel .catagray').find('.item').remove();
	for(var j=0;j<allGW.length;j++){
		var str = '';
		str += '<li class="item">';
		str += '<span class="glyphicon glyphicon-list-alt icon"></span>';
		str += '<a href="javascript:void(0);" class="name gw">'+allGW[j]+'</a>';
		str += '</li>';
		$('.srk .secl-panel .catagray').append(str);
	}
	if(currentGW == ''){currentGW = allGW[0];}
	var allGWDom = $('.srk .secl-panel .catagray .item .name');

	for(var k=0;k<allGWDom.length;k++){
		if($.trim(allGWDom.eq(k).text()) == currentGW){
			allGWDom.eq(k).addClass('active');
		}
	}
	getPeopleByGW();
}

function getPeopleByGW(){
	$('.secl-panel .list .tit .trigger').removeClass('active').find('.states').hide();
	$('.srk .secl-panel .list .item').remove();
	for(var i=0;i<data.length;i++){
		if(data[i].gw == currentGW){
			var str = '';
			str += '<li class="item">';
			str += '<a href="javascript:void(0);" class="trigger" data-id="'+data[i].id+'">';
			str += '<div class="checkbox-box">';
			if(data[i].checked == true){
				str += '<div class="states" style="display:block;"></div>';
			}else{
				str += '<div class="states"></div>';
			}
			str += '</div>';
			str += '<div class="img-box">';
			str += '</div>';
			str += '<div class="name">'+data[i].name+'</div>';
			str += '</a>';
			str += '</li>';
			$('.srk .secl-panel .list').append(str);
		}
	}
}
function getPeopleByBM(){
	$('.secl-panel .list .tit .trigger').removeClass('active').find('.states').hide();
	$('.srk .secl-panel .list .item').remove();
	for(var i=0;i<data.length;i++){
		if(data[i].department == currentBM){
			var str = '';
			str += '<li class="item">';
			str += '<a href="javascript:void(0);" class="trigger" data-id="'+data[i].id+'">';
			str += '<div class="checkbox-box">';
			if(data[i].checked == true){
				str += '<div class="states" style="display:block;"></div>';
			}else{
				str += '<div class="states"></div>';
			}
			str += '</div>';
			str += '<div class="img-box">';
			str += '</div>';
			str += '<div class="name">'+data[i].name+'</div>';
			str += '</a>';
			str += '</li>';
			$('.srk .secl-panel .list').append(str);
		}
	}
}

// 点击部门列表
$('.srk .secl-panel').on('click','.catagray .item .name.bm',function(e){
	currentBM = $.trim($(this).text());
	$('.srk .secl-panel .catagray .item .name').removeClass('active');
	$(this).addClass('active')
	getPeopleByBM();	
});

// 点击岗位列表
$('.srk .secl-panel').on('click','.catagray .item .name.gw',function(e){
	currentGW = $.trim($(this).text());
	$('.srk .secl-panel .catagray .item .name').removeClass('active');
	$(this).addClass('active')
	getPeopleByGW();	
});

//选择大分类
$('.srk .secl-panel .big-catagray .item').click(function(){
	$('.srk .secl-panel .big-catagray .item').removeClass('active');
	$(this).addClass('active');
	currentCategray = $(this).attr('data-catagray');
	refreshPanel();
});
