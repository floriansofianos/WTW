import * as import0 from '../../app/main-app.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '@ngx-translate/core/src/translate.service';
import * as import9 from '@ngx-translate/core/src/translate.pipe';
import * as import10 from '@angular/core/src/change_detection/change_detection_util';
export class Wrapper_MainAppComponent {
  /*private*/ _eventHandler:Function;
  context:import0.MainAppComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any) {
    this._changed = false;
    this.context = new import0.MainAppComponent(p0);
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
var renderType_MainAppComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_MainAppComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.MainAppComponent>;
  _MainAppComponent_0_3:Wrapper_MainAppComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_MainAppComponent_Host0,renderType_MainAppComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'main-app',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_MainAppComponent0(this.viewUtils,this,0,this._el_0);
    this._MainAppComponent_0_3 = new Wrapper_MainAppComponent(this.injectorGet(import8.TranslateService,this.parentIndex));
    this.compView_0.create(this._MainAppComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._MainAppComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.MainAppComponent) && (0 === requestNodeIndex))) { return this._MainAppComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._MainAppComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const MainAppComponentNgFactory:import7.ComponentFactory<import0.MainAppComponent> = new import7.ComponentFactory<import0.MainAppComponent>('main-app',View_MainAppComponent_Host0,import0.MainAppComponent);
const styles_MainAppComponent:any[] = ([] as any[]);
var renderType_MainAppComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_MainAppComponent,{});
export class View_MainAppComponent0 extends import1.AppView<import0.MainAppComponent> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _text_6:any;
  _el_7:any;
  _text_8:any;
  _text_9:any;
  /*private*/ _expr_10:any;
  _pipe_translate_0:import9.TranslatePipe;
  /*private*/ _expr_12:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_MainAppComponent0,renderType_MainAppComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
    this._expr_10 = import10.UNINITIALIZED;
    this._expr_12 = import10.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'h2',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'Hello World From Angular 2',(null as any));
    this._text_3 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,parentRenderNode,'h3',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'',(null as any));
    this._text_6 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,parentRenderNode,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_8 = this.renderer.createText(this._el_7,'',(null as any));
    this._text_9 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._pipe_translate_0 = new import9.TranslatePipe(this.parentView.injectorGet(import8.TranslateService,this.parentIndex),this.ref);
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._text_6,
      this._el_7,
      this._text_8,
      this._text_9
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const valUnwrapper:any = new import10.ValueUnwrapper();
    valUnwrapper.reset();
    const currVal_10:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(this._pipe_translate_0.transform('HOME.TITLE')),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_10,currVal_10))) {
      this.renderer.setText(this._text_5,currVal_10);
      this._expr_10 = currVal_10;
    }
    const currVal_12:any = import3.inlineInterpolate(1,'',this.context.testVariable,'');
    if (import3.checkBinding(throwOnChange,this._expr_12,currVal_12)) {
      this.renderer.setText(this._text_8,currVal_12);
      this._expr_12 = currVal_12;
    }
  }
  destroyInternal():void {
    this._pipe_translate_0.ngOnDestroy();
  }
}