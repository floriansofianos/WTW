import * as import0 from '../../../app/login/login-page.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '../../../app/login/login-form/login-form.component';
import * as import9 from './login-form/login-form.component.ngfactory';
import * as import10 from '@ngx-translate/core/src/translate.pipe';
import * as import11 from '@angular/core/src/change_detection/change_detection_util';
import * as import12 from '@angular/router/src/router';
import * as import13 from '../../../app/auth/auth.service';
import * as import14 from '@ngx-translate/core/src/translate.service';
export class Wrapper_LoginPageComponent {
  /*private*/ _eventHandler:Function;
  context:import0.LoginPageComponent;
  /*private*/ _changed:boolean;
  constructor() {
    this._changed = false;
    this.context = new import0.LoginPageComponent();
  }
  ngOnDetach(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  ngDoCheck(view:import1.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    return changed;
  }
  checkHost(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any,throwOnChange:boolean):void {
  }
  handleEvent(eventName:string,$event:any):boolean {
    var result:boolean = true;
    return result;
  }
  subscribe(view:import1.AppView<any>,_eventHandler:any):void {
    this._eventHandler = _eventHandler;
  }
}
var renderType_LoginPageComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_LoginPageComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.LoginPageComponent>;
  _LoginPageComponent_0_3:Wrapper_LoginPageComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_LoginPageComponent_Host0,renderType_LoginPageComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'ng-component',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_LoginPageComponent0(this.viewUtils,this,0,this._el_0);
    this._LoginPageComponent_0_3 = new Wrapper_LoginPageComponent();
    this.compView_0.create(this._LoginPageComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._LoginPageComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.LoginPageComponent) && (0 === requestNodeIndex))) { return this._LoginPageComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._LoginPageComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const LoginPageComponentNgFactory:import7.ComponentFactory<import0.LoginPageComponent> = new import7.ComponentFactory<import0.LoginPageComponent>('ng-component',View_LoginPageComponent_Host0,import0.LoginPageComponent);
const styles_LoginPageComponent:any[] = ([] as any[]);
var renderType_LoginPageComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_LoginPageComponent,{});
export class View_LoginPageComponent0 extends import1.AppView<import0.LoginPageComponent> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _text_3:any;
  _el_4:any;
  compView_4:import1.AppView<import8.LoginFormComponent>;
  _LoginFormComponent_4_3:import9.Wrapper_LoginFormComponent;
  _text_5:any;
  /*private*/ _expr_8:any;
  _pipe_translate_0:import10.TranslatePipe;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_LoginPageComponent0,renderType_LoginPageComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
    this._expr_8 = import11.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'h2',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'',(null as any));
    this._text_3 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,parentRenderNode,'login-form',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_4 = new import9.View_LoginFormComponent0(this.viewUtils,this,4,this._el_4);
    this._LoginFormComponent_4_3 = new import9.Wrapper_LoginFormComponent(this.parentView.injectorGet(import12.Router,this.parentIndex),this.parentView.injectorGet(import13.AuthService,this.parentIndex));
    this.compView_4.create(this._LoginFormComponent_4_3.context);
    this._text_5 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._pipe_translate_0 = new import10.TranslatePipe(this.parentView.injectorGet(import14.TranslateService,this.parentIndex),this.ref);
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._text_3,
      this._el_4,
      this._text_5
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import8.LoginFormComponent) && (4 === requestNodeIndex))) { return this._LoginFormComponent_4_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const valUnwrapper:any = new import11.ValueUnwrapper();
    this._LoginFormComponent_4_3.ngDoCheck(this,this._el_4,throwOnChange);
    valUnwrapper.reset();
    const currVal_8:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(this._pipe_translate_0.transform('LOGIN.TITLE')),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_8,currVal_8))) {
      this.renderer.setText(this._text_2,currVal_8);
      this._expr_8 = currVal_8;
    }
    this.compView_4.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_4.destroy();
    this._pipe_translate_0.ngOnDestroy();
  }
}