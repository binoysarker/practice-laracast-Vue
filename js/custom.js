Vue.component('task-list',{
	data(){
		return{
			todos:[
			{name:'todo1',completed:false},
			{name:'todo2',completed:false},
			{name:'todo3',completed:false},
			{name:'todo4',completed:true},
			{name:'todo5',completed:false},
			],
		}
	},
	template:`
	<ul>
		<task v-for='todo in todos' :key='todo.index'>
			<template slot='single-task'>{{todo.name}}</template>
		</task>
	</ul>
	`
});

Vue.component('task',{
	template:`<li><slot name='single-task'></slot></li>`
});

Vue.component('single-post',{
	template:`
	<div>
		<slot></slot>
	</div>
	`
});

Vue.component('vue-message',{
	props:{
		title1:{
			type:String,
		},
		body1:{
			type:String,
		},
		title2:{
			type:String,
		},
		body2:{
			type:String,
		},
	},
	data(){
		return{
			isVisiable:true,
		}
	},
	methods:{
		closeMessage(){
			this.isVisiable = !this.isVisiable;
		}
	},
	template:`
	<div class="container" >
		<article class="message" v-show='isVisiable'>
		<div class="message-header">
			<h3>Message title</h3>
			<button type="button" @click='closeMessage' class="button is-primary">x</button>
		</div>
		<div class="message-body">
			<p>{{title1}} and {{body1}}</p>
			<p>{{title2}} and {{body2}}</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>
		
	</article>
	</div>
	`
});


Vue.component('vue-modal',{
	props:{
		
	},
	data(){
		return{
			
		}
	},
	methods:{
		
	},
	template:`
	<div class="modal is-active">
	  <div class="modal-background"></div>
	  <div class="modal-card">
	    <header class="modal-card-head">
	      <p class="modal-card-title">Modal title</p>
	      <button class="delete"  @click='$emit("close")' aria-label="close"></button>
	    </header>
	    <section class="modal-card-body">
	      <!-- Content ... -->
	    </section>
	    <footer class="modal-card-foot">
	      <button class="button is-success">Save changes</button>
	      <button class="button" @click='$emit("close")' >Cancel</button>
	    </footer>
	  </div>
	</div>
	`
});

// vue nav
Vue.component('vue-tabs',{
	template:`
	<div>
		<div class="tabs">
		  <ul>
		    <li v-for='tab in tabs' :class="{'is-active':tab.isActive}">
		    	<a :href="tab.href" @click="selectTab(tab)">{{tab.name}}</a>
		    </li>
		  </ul>
		</div>
		<div class="tab-details">
		<slot></slot>	
		</div>
	</div>

	`,
	data(){
		return{
			tabs:[],
		}
	},

	created(){
		this.tabs = this.$children;
	},
	methods:{
		selectTab(selectedTab){
			this.tabs.forEach(tab => {
				tab.isActive = (tab.name == selectedTab.name);
			});
		},
	},
});


Vue.component('vue-tab',{
	data(){
		return{
			isActive:false,
		}
	},
	props:{
		name:{
			require:true
		},
		selected:{
			default:false,
		},
	},
	computed:{
		href(){
			// for example about-us
			return '#' + this.name.toLowerCase();
		},
	},
	template:`
	<div v-show="isActive">
		<slot></slot>
		
	</div>
	`,
	mounted(){
		this.isActive = this.selected;
	},
});

// new vue instance for siblings communication
window.Event = new Vue();	

Vue.component('cupon',{
	template:`
	<input type="text" placeholder='Enter your cupon' @blur='onCuponApplied' />
	`,
	methods:{
		onCuponApplied(){
			Event.$emit('applied');
			// this.$emit('applied');
			// alert('you have your cupon');
		},
	},
});

// new modal component section
Vue.component('new-modal',{
	template:`
	<div class="modal is-active">
	  <div class="modal-background"></div>
	  <div class="modal-card">
	    <header class="modal-card-head">
	      <p class="modal-card-title">
	      	<slot name='modal-title'></slot>
	      </p>
	      <button class="delete" aria-label="close" @click='close'></button>
	    </header>
	    <section class="modal-card-body">
	      <slot></slot>
	    </section>
	    <footer class="modal-card-foot">
	      <slot name='modal-footer'>
					<button class="button is-primary">Okay</button>
	      </slot>
	    </footer>
	  </div>
	</div>
	`,
	methods:{
		close(){
			Event.$emit('closeModal');
		},
	},
});


var app = new Vue({
	el:'#app',
	data:{
		title:'Hello vue',
		message:'',
		items:['item1','item2','item3','item4'],
		newItem:'',
		getTitle:'I am a title of the button',
		toggleClass:false,
		isDisabled:false,
		tasks:[
		{description:'description1',completed:false},
		{description:'description2',completed:true},
		{description:'description3',completed:false},
		{description:'description4',completed:true},
		{description:'description5',completed:false},
		],
		showModal:false,
		cuponApplied:false,

	},
	methods:{
		addItem(){
			this.items.push(this.newItem);
			this.newItem = '';
		},
		ToggleComplete(value){
			var getTask = this.tasks.filter(task => task.description == value);
			console.log(getTask[0].completed = !getTask[0].completed);
		},
		onCuponApplied(){
			this.cuponApplied = true;
		},
		close(){
			this.showModal = false;
		},
		
		
	},
	computed:{
		reverseMessage(){
			return this.message.split('').reverse().join();
		},
		CompletedTasks(){
			return this.tasks.filter(task => task.completed);
		},
		IncompletedTasks(){
			return this.tasks.filter(task => !task.completed);
		},
	},
	created(){
		Event.$on('applied',() => alert("sibling is handling this event"));
		Event.$on('closeModal',() => this.showModal = false);
	},
});