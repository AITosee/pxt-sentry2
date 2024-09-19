declare namespace sentry {
  //% shim=tosee_sentry::sentry2_Begin
  function sentry2_Begin(mode: number, addr: number): number;

  //% shim=tosee_sentry::sentry2_LedSetColor
  function sentry2_LedSetColor(
    detected_color: number,
    undetected_color: number,
    leval: number
  ): number;

  //% shim=tosee_sentry::sentry2_CameraSetAwb
  function sentry2_CameraSetAwb(wb: number): number;

  //% shim=tosee_sentry::sentry2_SetParamNum
  function sentry2_SetParamNum(vision_type: number, max_num: number): number;

  //% shim=tosee_sentry::sentry2_SetParam
  function sentry2_SetParam(
    vision_type: number,
    param: Buffer,
    param_id: number
  ): number;

  //% shim=tosee_sentry::sentry2_VisionSetStatus
  function sentry2_VisionSetStatus(status: number, vision_type: number): number;

  //% shim=tosee_sentry::sentry2_GetValue
  function sentry2_GetValue(
    vision_type: number,
    object_info: number,
    obj_id: number
  ): number;

  //% shim=tosee_sentry::sentry2_GetQrCodeValue
  function sentry2_GetQrCodeValue(): string;
}
