(function (angular) {
	'use strict';

	var myApp = angular.module('MyTodoMvc',['ngRoute']);

	//路由
	myApp.config(['$routeProvider',function ($routeProvider) {
		$routeProvider
			.when('/:status?',{
				controller:"mainCtr",
				templateUrl:'tpl/index_tpl.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);



	myApp.controller('mainCtr',['$scope','$location','$routeParams','$route',function($scope,$location,$routeParams,$route){
		$scope.text = '';  //文本框
		$scope.data = [
			 {id:1,txt:'学习',completed:true}
			,{id:2,txt:'看书',completed:false}
			,{id:3,txt:'打球',completed:true}
			,{id:4,txt:'吃饭',completed:false}
			,{id:5,txt:'睡觉',completed:false}
		];

		//实现id自增，且不重复
		$scope.getId = function() {
			var id = parseInt(Math.random()*1000);
			for(var i =0; i<$scope.data.length;i++){
				if($scope.data[i].id === id){
					id=$scope.getId();
					break;
				}
			}
			return id;

		}
		//新增
		$scope.add=function () {
			if(!$scope.text){   //判断是否有输入值
				return;
			}
			$scope.data.push({
				id:$scope.getId(),   //随机数减少id重复的几率
				txt:$scope.text,
				completed:false
			});
			//清空文本框
			$scope.text = '';
		}

		//获取索引值
		var findIndex=function(id){
			var index=-1;
			angular.forEach($scope.data,function(item,key){
				if(item.id===id){
					index=key;
					return;
				}

			});
			return index;
		}

		//删除
		$scope.remove=function (id) {
			var index=findIndex(id);
			//console.log(index);
			if(index!==-1){  //当找到产品所在的索引值时，进行删除
				$scope.data.splice(index,1);
			}
		}

		//清空所有
		// $scope.clear=function () {
		// 	$scope.data=[];
		// }

		//清空已完成项目
		$scope.clear=function () {
			var result = [];
			angular.forEach($scope.data,function (item,key) {
				if(!item.completed){  //过滤掉已完成的项目
					result.push(item);
				}

			})
			$scope.data = result;
		}

		//是否有已经完成的项目
		$scope.exitCompleted =function () {
			for(var i=0; i<$scope.data.length; i++){
				if($scope.data[i].completed){
					return true;
				}
			}
			return false;
		}


		//编辑当前元素

		$scope.curEditingId=-1;
		$scope.editing =function (id) {
			$scope.curEditingId=id;
		}
		$scope.save =function () {
			$scope.curEditingId=-1;
		}

		//全选
		var now=true;
		$scope.toggleAll=function () {
			angular.forEach($scope.data,function (item,key) {
				item.completed=now;
			})
			now=!now;
		}


		//状态筛选
		$scope.selector={};
		$scope.$location = $location;
		var status = $routeParams.status;
			console.log($routeParams)
			console.log(status)

		switch (status){
			case 'active':
				$scope.selector={completed:false};
				break;
			case 'completed':
				$scope.selector={completed:true};
				break;
			default:
				$route.updateParams({status:''});   //当输入的锚点不是想要的锚点时，自动跳转到默认锚点
				$scope.selector={}
				break;
		}




		//1.拿到锚点值


		//2.根据锚点值对selector做变换




	}])

	myApp.controller('rowCtr',['$scope','$filter','$location',function ($scope,$filter,$location) {
		$scope.name='shimilygood123456';
		$scope.ceshi = $filter('limitTo')($scope.name,10,2);


	}]);

})(angular);
