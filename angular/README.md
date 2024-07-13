\*\* trong 1 component sẽ có:

@Component({

-   selector: '', // tạo ra 1 thẻ selector, 1 html tag
-   templateUrl: '', //đường link file html
-   template: '' // viết thằng mã html vào
-   styleUrls: // đường link file css,
-   style :[] //viết thằng css vào giống kiểu inline css
    })
    cách import component: cần bỏ các component vào module,
    \*\* Tạo component sử dụng Angular CLI:ng g c my-new-component
    nó sẽ tạo ra 4 file html, css, test, component

\*\* cách nhúng bootstrap vào angular.json

{
styles": ["src/styles.scss", "./node_modules/bootstrap/dist/css/bootstrap.min.css"],
"scripts": ["./node_modules/jquery/dist/jquery.min.js", "./node_modules/bootstrap/dist/js/bootstrap.min.js"]
}
\*\*

\*\* binding 1 chiều

\*\* property binding: gán các biến của class cho Dom : ex [hidden]="bien", [src]="bien"
example: export class AppComponent {
title = 'Ứng dụng Angular Đầu tiên';
}

\*\* event binding:: Dom tương tác với component
example: click, change...

(click)="handle()"
\*\* binding 2 chiều: [(ngMode)=""]
\*\* template reference variable
\*\* Style binding
inline style <h1 style="color: red"></h1>
inline style <h1 [style.color]="red"></h1> // đi tìm biến red => <h1 [style.color]="'red'"></h1> color : red

<h1 [style.color]="name.length >0 ? 'red' : 'blue'"></h1> // nếu biến name.length > 0 thì sẽ có màu red cà ngược lại

\*\* class binding

<h1 class="style"></h1>
.style{
  color: red
}
<h1 [class]="name.length > 0 ? 'style' : 'style2'"></h1>
<h1 [class.style]="name.length > 0" [class.style2]="!name.length >0"></h1>
.style{
  color: red
} 
.style2{
  color: blue
}

\*\* directive đưa các chỉ dẫn Angular chuyển đổi template thành DOM
có 3 loại directive:

1. Component -> directive với 1 template
2. Attribute directive:(thuộc tính hiển thị) -> thay đổi việc hiển thị(màu sắc) hoặc thành hành vi(ngModle) của các DOM, component hoặc directive khác
   có 2 loại directive: nổi tiếng
   -ngStyle:<h1 [ngStyle]="{color:'red',fontSize:'16px'}"></h1>
   => đặt 1 biến tên currentStyle ={color:'red',fontSize:'16px'} <h1 [ngStyle]="currentStyle"></h1>
   -ngClass:<h1 [ngClass]="{color:'red',fontSize:'16px'}"></h1>
   => đặt 1 biến tên currentClass ={color:'red',fontSize:'16px'} <h1 [ngClass]="currentClass"></h1>
3. Structural directive:(cấu trúc hiển thị) -> thêm bớt các DOM
   có 2 loại Structural: nổi tiếng
   --ngIf:
   const isShow = true <div *ngIf="isShow"><div>chu toan</div></div>
   -ngFor:
   example1: const arrString =["angular","react","vue]=><ul *ngFor="let item of arrString"><li>{{item}}</li></ul>
   example2: const arrObject =[{"id":1,"name":chutoan},{"id":2,"name":chutoan2}]
   =><ul \*ngFor="let item of arrObject"><li>{{item.id}}</li><li>{{item.name}}</li></ul>

\*\* Input Binding: truyền tham số từ cha vào các component con: giống props trong react
component con: @Input() name: String = '';
component cha: <app-home name="chutoan"></app-home>,<app-home [name]="chutoan"></app-home>
input() sẽ có 2 vòng đời, ngOnInit, onChanges,

ngOnInit(){
chỉ chạy 1 lần duy nhất
chạy sau khi các giá trị Input() đươc bind
}
ngOnchages(){
chạy trước khi các giá trị Input() đươc bind
, và thay đổi khi các giá rị thay đổi
}

vòng đời của nó ngOnchanes >>> ngOnInit
\*\* output Binding: truyền tham số từ con sang các component cha,
-thông qua @output và EventEmitter
component con:
<button (click)="add()"></button>

@output() myClick = new EventEmitter();
add(){
this.myClick.emit()
}

\*\* ViewChild/ViewChildren

component cha: <app-child (myClick)="value= value +1"></app-child>
-thông qua #child
component cha:
<button (click)="child.value = child.value +1"></button>
<app-child #child></app-child>
component con:<h3>{{value}}</h3>
-thông qua @output và ViewChild
component cha:
<button (click)="add()"></button>
<app-child></app-child>
@ViewChild(componet con)
mychild: component con
add(){
chuc nang
}
component con:<h3>{{value}}</h3>

\*\* <ng-container></ng-container> giống với <></> trong react
\*\* <ng-content></ng-content> giống với <>{props.child}</> trong react
\*\* Biến đổi dữ liệu đầu ra, hiển thị lên trên template đúng với ý tưởng thiết kế lập trình
example: định dạng kiểu hiển thị datetime, viết hoa chữ cái, hiển thị tên thành phố, định dạng lại số hay đơn vị tiền, ...

ngOnit(): chạy 1 lần khi coponent này dc phát sinh
get()
set()
inputs:['']

\*\* Service ina angular
ngSubmit()="ham" thuong dùng trong form
