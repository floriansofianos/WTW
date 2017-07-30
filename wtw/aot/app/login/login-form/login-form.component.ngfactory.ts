import * as import0 from '../../../../app/login/login-form/login-form.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '@angular/router/src/router';
import * as import9 from '../../../../app/auth/auth.service';
import * as import10 from '@ngx-translate/core/src/translate.pipe';
import * as import11 from '@angular/core/src/linker/view_container';
import * as import12 from '@angular/core/src/change_detection/change_detection_util';
import * as import13 from '@ngx-translate/core/src/translate.service';
import * as import14 from '../../../node_modules/@angular/forms/src/directives/reactive_directives/form_group_directive.ngfactory';
import * as import15 from '../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import16 from '../../../node_modules/@angular/forms/src/directives/default_value_accessor.ngfactory';
import * as import17 from '../../../node_modules/@angular/forms/src/directives/reactive_directives/form_control_name.ngfactory';
import * as import18 from '../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import19 from '@angular/core/src/linker/element_ref';
import * as import20 from '@angular/core/src/linker/template_ref';
import * as import21 from '@angular/forms/src/directives/default_value_accessor';
import * as import22 from '@angular/forms/src/directives/control_value_accessor';
import * as import23 from '@angular/forms/src/directives/reactive_directives/form_control_name';
import * as import24 from '@angular/forms/src/directives/ng_control';
import * as import25 from '@angular/forms/src/directives/ng_control_status';
import * as import26 from '@angular/common/src/directives/ng_if';
import * as import27 from '@angular/forms/src/directives/reactive_directives/form_group_directive';
import * as import28 from '@angular/forms/src/directives/control_container';
export class Wrapper_LoginFormComponent {
  /*private*/ _eventHandler:Function;
  context:import0.LoginFormComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this.context = new import0.LoginFormComponent(p0,p1);
  }
  ngOnDetach(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  ngDoCheck(view:import1.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    if (!throwOnChange) { if ((view.numberOfChecks === 0)) { this.context.ngOnInit(); } }
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
var renderType_LoginFormComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_LoginFormComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.LoginFormComponent>;
  _LoginFormComponent_0_3:Wrapper_LoginFormComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_LoginFormComponent_Host0,renderType_LoginFormComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'login-form',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_LoginFormComponent0(this.viewUtils,this,0,this._el_0);
    this._LoginFormComponent_0_3 = new Wrapper_LoginFormComponent(this.injectorGet(import8.Router,this.parentIndex),this.injectorGet(import9.AuthService,this.parentIndex));
    this.compView_0.create(this._LoginFormComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._LoginFormComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.LoginFormComponent) && (0 === requestNodeIndex))) { return this._LoginFormComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._LoginFormComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const LoginFormComponentNgFactory:import7.ComponentFactory<import0.LoginFormComponent> = new import7.ComponentFactory<import0.LoginFormComponent>('login-form',View_LoginFormComponent_Host0,import0.LoginFormComponent);
const styles_LoginFormComponent:any[] = ([] as any[]);
class View_LoginFormComponent1 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  /*private*/ _expr_2:any;
  _pipe_translate_0:import10.TranslatePipe;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import11.ViewContainer) {
    super(View_LoginFormComponent1,renderType_LoginFormComponent,import5.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_2 = import12.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this._pipe_translate_0 = new import10.TranslatePipe(this.parentView.injectorGet(import13.TranslateService,this.parentIndex),this.parentView.ref);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const valUnwrapper:any = new import12.ValueUnwrapper();
    valUnwrapper.reset();
    const currVal_2:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(this._pipe_translate_0.transform('LOGIN.FORM.WRONGPASSWORD')),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_2,currVal_2))) {
      this.renderer.setText(this._text_1,currVal_2);
      this._expr_2 = currVal_2;
    }
  }
  destroyInternal():void {
    this._pipe_translate_0.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
var renderType_LoginFormComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_LoginFormComponent,{});
export class View_LoginFormComponent0 extends import1.AppView<import0.LoginFormComponent> {
  _text_0:any;
  _el_1:any;
  _FormGroupDirective_1_3:import14.Wrapper_FormGroupDirective;
  _ControlContainer_1_4:any;
  _NgControlStatusGroup_1_5:import15.Wrapper_NgControlStatusGroup;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _el_5:any;
  _DefaultValueAccessor_5_3:import16.Wrapper_DefaultValueAccessor;
  _NG_VALUE_ACCESSOR_5_4:any[];
  _FormControlName_5_5:import17.Wrapper_FormControlName;
  _NgControl_5_6:any;
  _NgControlStatus_5_7:import15.Wrapper_NgControlStatus;
  _text_6:any;
  _text_7:any;
  _el_8:any;
  _text_9:any;
  _el_10:any;
  _DefaultValueAccessor_10_3:import16.Wrapper_DefaultValueAccessor;
  _NG_VALUE_ACCESSOR_10_4:any[];
  _FormControlName_10_5:import17.Wrapper_FormControlName;
  _NgControl_10_6:any;
  _NgControlStatus_10_7:import15.Wrapper_NgControlStatus;
  _text_11:any;
  _text_12:any;
  _anchor_13:any;
  /*private*/ _vc_13:import11.ViewContainer;
  _TemplateRef_13_5:any;
  _NgIf_13_6:import18.Wrapper_NgIf;
  _text_14:any;
  _el_15:any;
  _text_16:any;
  _text_17:any;
  _el_18:any;
  _text_19:any;
  _text_20:any;
  _text_21:any;
  /*private*/ _expr_38:any;
  _pipe_translate_0:import10.TranslatePipe;
  /*private*/ _expr_40:any;
  _pipe_translate_1:import10.TranslatePipe;
  /*private*/ _expr_42:any;
  _pipe_translate_2:import10.TranslatePipe;
  /*private*/ _expr_44:any;
  _pipe_translate_3:import10.TranslatePipe;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_LoginFormComponent0,renderType_LoginFormComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
    this._expr_38 = import12.UNINITIALIZED;
    this._expr_40 = import12.UNINITIALIZED;
    this._expr_42 = import12.UNINITIALIZED;
    this._expr_44 = import12.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'form',new import3.InlineArray4(4,'autocomplete','off','novalidate',''),(null as any));
    this._FormGroupDirective_1_3 = new import14.Wrapper_FormGroupDirective((null as any),(null as any));
    this._ControlContainer_1_4 = this._FormGroupDirective_1_3.context;
    this._NgControlStatusGroup_1_5 = new import15.Wrapper_NgControlStatusGroup(this._ControlContainer_1_4);
    this._text_2 = this.renderer.createText(this._el_1,'\n    ',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_1,'p',new import3.InlineArray2(2,'class','form-group'),(null as any));
    this._text_4 = this.renderer.createText(this._el_3,'\n        ',(null as any));
    this._el_5 = import3.createRenderElement(this.renderer,this._el_3,'input',new import3.InlineArray8(6,'formControlName','login','id','login','type','text'),(null as any));
    this._DefaultValueAccessor_5_3 = new import16.Wrapper_DefaultValueAccessor(this.renderer,new import19.ElementRef(this._el_5));
    this._NG_VALUE_ACCESSOR_5_4 = [this._DefaultValueAccessor_5_3.context];
    this._FormControlName_5_5 = new import17.Wrapper_FormControlName(this._ControlContainer_1_4,(null as any),(null as any),this._NG_VALUE_ACCESSOR_5_4);
    this._NgControl_5_6 = this._FormControlName_5_5.context;
    this._NgControlStatus_5_7 = new import15.Wrapper_NgControlStatus(this._NgControl_5_6);
    this._text_6 = this.renderer.createText(this._el_3,'\n    ',(null as any));
    this._text_7 = this.renderer.createText(this._el_1,'\n    ',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_1,'p',new import3.InlineArray2(2,'class','form-group'),(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'\n        ',(null as any));
    this._el_10 = import3.createRenderElement(this.renderer,this._el_8,'input',new import3.InlineArray8(6,'formControlName','password','id','password','type','text'),(null as any));
    this._DefaultValueAccessor_10_3 = new import16.Wrapper_DefaultValueAccessor(this.renderer,new import19.ElementRef(this._el_10));
    this._NG_VALUE_ACCESSOR_10_4 = [this._DefaultValueAccessor_10_3.context];
    this._FormControlName_10_5 = new import17.Wrapper_FormControlName(this._ControlContainer_1_4,(null as any),(null as any),this._NG_VALUE_ACCESSOR_10_4);
    this._NgControl_10_6 = this._FormControlName_10_5.context;
    this._NgControlStatus_10_7 = new import15.Wrapper_NgControlStatus(this._NgControl_10_6);
    this._text_11 = this.renderer.createText(this._el_8,'\n    ',(null as any));
    this._text_12 = this.renderer.createText(this._el_1,'\n    ',(null as any));
    this._anchor_13 = this.renderer.createTemplateAnchor(this._el_1,(null as any));
    this._vc_13 = new import11.ViewContainer(13,1,this,this._anchor_13);
    this._TemplateRef_13_5 = new import20.TemplateRef_(this,13,this._anchor_13);
    this._NgIf_13_6 = new import18.Wrapper_NgIf(this._vc_13.vcRef,this._TemplateRef_13_5);
    this._text_14 = this.renderer.createText(this._el_1,'\n    ',(null as any));
    this._el_15 = import3.createRenderElement(this.renderer,this._el_1,'button',new import3.InlineArray4(4,'class','button-submit','type','submit'),(null as any));
    this._text_16 = this.renderer.createText(this._el_15,'',(null as any));
    this._text_17 = this.renderer.createText(this._el_1,'\n    ',(null as any));
    this._el_18 = import3.createRenderElement(this.renderer,this._el_1,'button',new import3.InlineArray4(4,'class','button-cancel','type','submit'),(null as any));
    this._text_19 = this.renderer.createText(this._el_18,'',(null as any));
    this._text_20 = this.renderer.createText(this._el_1,'\n',(null as any));
    this._text_21 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_1,new import3.InlineArray8(6,'ngSubmit',(null as any),'submit',(null as any),'reset',(null as any)),this.eventHandler(this.handleEvent_1));
    this._FormGroupDirective_1_3.subscribe(this,this.eventHandler(this.handleEvent_1),true);
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_5,new import3.InlineArray4(4,'input',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_5));
    this._pipe_translate_0 = new import10.TranslatePipe(this.parentView.injectorGet(import13.TranslateService,this.parentIndex),this.ref);
    var disposable_2:Function = import3.subscribeToRenderElement(this,this._el_10,new import3.InlineArray4(4,'input',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_10));
    this._pipe_translate_1 = new import10.TranslatePipe(this.parentView.injectorGet(import13.TranslateService,this.parentIndex),this.ref);
    this._pipe_translate_2 = new import10.TranslatePipe(this.parentView.injectorGet(import13.TranslateService,this.parentIndex),this.ref);
    var disposable_3:Function = import3.subscribeToRenderElement(this,this._el_18,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_18));
    this._pipe_translate_3 = new import10.TranslatePipe(this.parentView.injectorGet(import13.TranslateService,this.parentIndex),this.ref);
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._text_7,
      this._el_8,
      this._text_9,
      this._el_10,
      this._text_11,
      this._text_12,
      this._anchor_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._text_17,
      this._el_18,
      this._text_19,
      this._text_20,
      this._text_21
    ]
    ),[
      disposable_0,
      disposable_1,
      disposable_2,
      disposable_3
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import21.DefaultValueAccessor) && (5 === requestNodeIndex))) { return this._DefaultValueAccessor_5_3.context; }
    if (((token === import22.NG_VALUE_ACCESSOR) && (5 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_5_4; }
    if (((token === import23.FormControlName) && (5 === requestNodeIndex))) { return this._FormControlName_5_5.context; }
    if (((token === import24.NgControl) && (5 === requestNodeIndex))) { return this._NgControl_5_6; }
    if (((token === import25.NgControlStatus) && (5 === requestNodeIndex))) { return this._NgControlStatus_5_7.context; }
    if (((token === import21.DefaultValueAccessor) && (10 === requestNodeIndex))) { return this._DefaultValueAccessor_10_3.context; }
    if (((token === import22.NG_VALUE_ACCESSOR) && (10 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_10_4; }
    if (((token === import23.FormControlName) && (10 === requestNodeIndex))) { return this._FormControlName_10_5.context; }
    if (((token === import24.NgControl) && (10 === requestNodeIndex))) { return this._NgControl_10_6; }
    if (((token === import25.NgControlStatus) && (10 === requestNodeIndex))) { return this._NgControlStatus_10_7.context; }
    if (((token === import20.TemplateRef) && (13 === requestNodeIndex))) { return this._TemplateRef_13_5; }
    if (((token === import26.NgIf) && (13 === requestNodeIndex))) { return this._NgIf_13_6.context; }
    if (((token === import27.FormGroupDirective) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._FormGroupDirective_1_3.context; }
    if (((token === import28.ControlContainer) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._ControlContainer_1_4; }
    if (((token === import25.NgControlStatusGroup) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._NgControlStatusGroup_1_5.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const valUnwrapper:any = new import12.ValueUnwrapper();
    const currVal_1_0_0:any = this.context.loginForm;
    this._FormGroupDirective_1_3.check_form(currVal_1_0_0,throwOnChange,false);
    this._FormGroupDirective_1_3.ngDoCheck(this,this._el_1,throwOnChange);
    this._NgControlStatusGroup_1_5.ngDoCheck(this,this._el_1,throwOnChange);
    this._DefaultValueAccessor_5_3.ngDoCheck(this,this._el_5,throwOnChange);
    const currVal_5_1_0:any = 'login';
    this._FormControlName_5_5.check_name(currVal_5_1_0,throwOnChange,false);
    this._FormControlName_5_5.ngDoCheck(this,this._el_5,throwOnChange);
    this._NgControlStatus_5_7.ngDoCheck(this,this._el_5,throwOnChange);
    this._DefaultValueAccessor_10_3.ngDoCheck(this,this._el_10,throwOnChange);
    const currVal_10_1_0:any = 'password';
    this._FormControlName_10_5.check_name(currVal_10_1_0,throwOnChange,false);
    this._FormControlName_10_5.ngDoCheck(this,this._el_10,throwOnChange);
    this._NgControlStatus_10_7.ngDoCheck(this,this._el_10,throwOnChange);
    const currVal_13_0_0:any = this.context.showError;
    this._NgIf_13_6.check_ngIf(currVal_13_0_0,throwOnChange,false);
    this._NgIf_13_6.ngDoCheck(this,this._anchor_13,throwOnChange);
    this._vc_13.detectChangesInNestedViews(throwOnChange);
    this._NgControlStatusGroup_1_5.checkHost(this,this,this._el_1,throwOnChange);
    valUnwrapper.reset();
    const currVal_38:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(this._pipe_translate_0.transform('LOGIN.FORM.LOGIN')),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_38,currVal_38))) {
      this.renderer.setElementProperty(this._el_5,'placeholder',currVal_38);
      this._expr_38 = currVal_38;
    }
    this._NgControlStatus_5_7.checkHost(this,this,this._el_5,throwOnChange);
    valUnwrapper.reset();
    const currVal_40:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(this._pipe_translate_1.transform('LOGIN.FORM.PASSWORD')),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_40,currVal_40))) {
      this.renderer.setElementProperty(this._el_10,'placeholder',currVal_40);
      this._expr_40 = currVal_40;
    }
    this._NgControlStatus_10_7.checkHost(this,this,this._el_10,throwOnChange);
    valUnwrapper.reset();
    const currVal_42:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(this._pipe_translate_2.transform('FORM.OK')),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_42,currVal_42))) {
      this.renderer.setText(this._text_16,currVal_42);
      this._expr_42 = currVal_42;
    }
    valUnwrapper.reset();
    const currVal_44:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(this._pipe_translate_3.transform('FORM.CANCEL')),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_44,currVal_44))) {
      this.renderer.setText(this._text_19,currVal_44);
      this._expr_44 = currVal_44;
    }
  }
  destroyInternal():void {
    this._vc_13.destroyNestedViews();
    this._FormControlName_5_5.ngOnDestroy();
    this._FormControlName_10_5.ngOnDestroy();
    this._FormGroupDirective_1_3.ngOnDestroy();
    this._pipe_translate_0.ngOnDestroy();
    this._pipe_translate_1.ngOnDestroy();
    this._pipe_translate_2.ngOnDestroy();
    this._pipe_translate_3.ngOnDestroy();
  }
  createEmbeddedViewInternal(nodeIndex:number):import1.AppView<any> {
    if ((nodeIndex == 13)) { return new View_LoginFormComponent1(this.viewUtils,this,13,this._anchor_13,this._vc_13); }
    return (null as any);
  }
  handleEvent_1(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._FormGroupDirective_1_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngSubmit')) {
      const pd_sub_0:any = ((<any>this.context.login(this.context.loginForm.value)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_5(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_5_3.handleEvent(eventName,$event) && result);
    return result;
  }
  handleEvent_10(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_10_3.handleEvent(eventName,$event) && result);
    return result;
  }
  handleEvent_18(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.cancel()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}