import * as import0 from '../../../app/home/home-page.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '../../../app/auth/auth.service';
import * as import9 from '@ngx-translate/core/src/translate.pipe';
import * as import10 from '@angular/core/src/linker/view_container';
import * as import11 from '@angular/core/src/change_detection/change_detection_util';
import * as import12 from '@ngx-translate/core/src/translate.service';
import * as import13 from '../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import14 from '@angular/core/src/linker/template_ref';
import * as import15 from '@angular/common/src/directives/ng_if';
export class Wrapper_HomePageComponent {
  /*private*/ _eventHandler:Function;
  context:import0.HomePageComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any) {
    this._changed = false;
    this.context = new import0.HomePageComponent(p0);
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
var renderType_HomePageComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_HomePageComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.HomePageComponent>;
  _HomePageComponent_0_3:Wrapper_HomePageComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_HomePageComponent_Host0,renderType_HomePageComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'ng-component',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_HomePageComponent0(this.viewUtils,this,0,this._el_0);
    this._HomePageComponent_0_3 = new Wrapper_HomePageComponent(this.injectorGet(import8.AuthService,this.parentIndex));
    this.compView_0.create(this._HomePageComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._HomePageComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.HomePageComponent) && (0 === requestNodeIndex))) { return this._HomePageComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._HomePageComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const HomePageComponentNgFactory:import7.ComponentFactory<import0.HomePageComponent> = new import7.ComponentFactory<import0.HomePageComponent>('ng-component',View_HomePageComponent_Host0,import0.HomePageComponent);
const styles_HomePageComponent:any[] = ([] as any[]);
class View_HomePageComponent1 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  /*private*/ _expr_2:any;
  _pipe_translate_0:import9.TranslatePipe;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import10.ViewContainer) {
    super(View_HomePageComponent1,renderType_HomePageComponent,import5.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_2 = import11.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this._pipe_translate_0 = new import9.TranslatePipe(this.parentView.injectorGet(import12.TranslateService,this.parentIndex),this.parentView.ref);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const valUnwrapper:any = new import11.ValueUnwrapper();
    valUnwrapper.reset();
    const currVal_2:any = import3.inlineInterpolate(2,'\n',valUnwrapper.unwrap(this._pipe_translate_0.transform('HOME.WELCOME')),' ',this.parentView.context.name,'\n');
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
var renderType_HomePageComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_HomePageComponent,{});
export class View_HomePageComponent0 extends import1.AppView<import0.HomePageComponent> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _text_3:any;
  _anchor_4:any;
  /*private*/ _vc_4:import10.ViewContainer;
  _TemplateRef_4_5:any;
  _NgIf_4_6:import13.Wrapper_NgIf;
  _text_5:any;
  /*private*/ _expr_9:any;
  _pipe_translate_0:import9.TranslatePipe;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_HomePageComponent0,renderType_HomePageComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
    this._expr_9 = import11.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'h2',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'',(null as any));
    this._text_3 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._anchor_4 = this.renderer.createTemplateAnchor(parentRenderNode,(null as any));
    this._vc_4 = new import10.ViewContainer(4,(null as any),this,this._anchor_4);
    this._TemplateRef_4_5 = new import14.TemplateRef_(this,4,this._anchor_4);
    this._NgIf_4_6 = new import13.Wrapper_NgIf(this._vc_4.vcRef,this._TemplateRef_4_5);
    this._text_5 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._pipe_translate_0 = new import9.TranslatePipe(this.parentView.injectorGet(import12.TranslateService,this.parentIndex),this.ref);
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._text_3,
      this._anchor_4,
      this._text_5
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import14.TemplateRef) && (4 === requestNodeIndex))) { return this._TemplateRef_4_5; }
    if (((token === import15.NgIf) && (4 === requestNodeIndex))) { return this._NgIf_4_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const valUnwrapper:any = new import11.ValueUnwrapper();
    const currVal_4_0_0:any = this.context.name;
    this._NgIf_4_6.check_ngIf(currVal_4_0_0,throwOnChange,false);
    this._NgIf_4_6.ngDoCheck(this,this._anchor_4,throwOnChange);
    this._vc_4.detectChangesInNestedViews(throwOnChange);
    valUnwrapper.reset();
    const currVal_9:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(this._pipe_translate_0.transform('HOME.TITLE')),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_9,currVal_9))) {
      this.renderer.setText(this._text_2,currVal_9);
      this._expr_9 = currVal_9;
    }
  }
  destroyInternal():void {
    this._vc_4.destroyNestedViews();
    this._pipe_translate_0.ngOnDestroy();
  }
  createEmbeddedViewInternal(nodeIndex:number):import1.AppView<any> {
    if ((nodeIndex == 4)) { return new View_HomePageComponent1(this.viewUtils,this,4,this._anchor_4,this._vc_4); }
    return (null as any);
  }
}