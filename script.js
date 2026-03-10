let currentUser = localStorage.getItem("currentUser")

function register(){

let user=document.getElementById("regUser").value
let pass=document.getElementById("regPass").value
let email=document.getElementById("regEmail").value

let users=JSON.parse(localStorage.getItem("users")||"[]")

users.push({user,pass,email})

localStorage.setItem("users",JSON.stringify(users))

alert("Đăng ký thành công")

location.href="sign-in.html"

}

function login(){

let user=document.getElementById("loginUser").value
let pass=document.getElementById("loginPass").value

if(user=="admin" && pass=="123456"){
location.href="admin.html"
return
}

let users=JSON.parse(localStorage.getItem("users")||"[]")

let found=users.find(u=>u.user==user && u.pass==pass)

if(found){

localStorage.setItem("currentUser",user)

alert("Đăng nhập thành công")

location.href="index.html"

}else{

alert("Sai tài khoản")

}

}

function order(product){

let user=localStorage.getItem("currentUser")

if(!user){

alert("Bạn phải đăng nhập")

return

}

let orders=JSON.parse(localStorage.getItem("orders")||"[]")

orders.push({
user:user,
product:product,
status:"Chờ admin duyệt"
})

localStorage.setItem("orders",JSON.stringify(orders))

alert("Đặt hàng thành công")

}

function loadAdmin(){

let orders=JSON.parse(localStorage.getItem("orders")||"[]")

let list=document.getElementById("adminOrders")

list.innerHTML=""

orders.forEach((o,i)=>{

let li=document.createElement("li")

li.innerHTML=o.user+" mua "+o.product+" - "+o.status+
" <button onclick='approve("+i+")'>Duyệt</button>"+
" <button onclick='removeOrder("+i+")'>Xóa</button>"

list.appendChild(li)

})

}

function approve(i){

let orders=JSON.parse(localStorage.getItem("orders"))

orders[i].status="Đã duyệt"

localStorage.setItem("orders",JSON.stringify(orders))

loadAdmin()

}

function removeOrder(i){

let orders=JSON.parse(localStorage.getItem("orders"))

orders.splice(i,1)

localStorage.setItem("orders",JSON.stringify(orders))

loadAdmin()

}
