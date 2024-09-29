declare const enum sentry_vision_e_1 {
  //% block="Color"
  //% blockHidden=true
  kVisionColor = 1,
  //% block="Blob"
  kVisionBlob = 2,
  //% block="AprilTag"
  kVisionAprilTag = 3,
  //% block="Line"
  //% blockHidden=true
  kVisionLine = 4,
  //% block="Learning"
  kVisionLearning = 5,
  //% block="Card"
  kVisionCard = 6,
  //% block="Face"
  kVisionFace = 7,
  //% block="20Classes"
  kVision20Classes = 8,
  //% block="QrCode"
  //% blockHidden=true
  kVisionQrCode = 9,
  //% block="Custom"
  kVisionCustom = 10,
  //% block="Motion"
  kVisionMotionDetect = 11,
  //% blockHidden=true
  kVisionMaxType,
}

declare const enum sentry_vision_e_2 {
  //% block="Color"
  kVisionColor = 1,
  //% block="Blob"
  kVisionBlob = 2,
  //% block="AprilTag"
  //% blockHidden=true
  kVisionAprilTag = 3,
  //% block="Line"
  //% blockHidden=true
  kVisionLine = 4,
  //% block="Learning"
  kVisionLearning = 5,
  //% block="Card"
  //% blockHidden=true
  kVisionCard = 6,
  //% block="Face"
  kVisionFace = 7,
  //% block="20Classes"
  //% blockHidden=true
  kVision20Classes = 8,
  //% block="QrCode"
  //% blockHidden=true
  kVisionQrCode = 9,
  //% block="Custom"
  kVisionCustom = 10,
  //% block="MotionDetect"
  //% blockHidden=true
  kVisionMotionDetect = 11,
  //% blockHidden=true
  kVisionMaxType,
}

declare const enum sentry_led_color_e {
  //% block="off"
  kLedClose = 0,
  //% block="Red"
  kLedRed = 1,
  //% block="Green"
  kLedGreen = 2,
  //% block="Yellow"
  kLedYellow = 3,
  //% block="Blue"
  kLedBlue = 4,
  //% block="Purple"
  kLedPurple = 5,
  //% block="Cyan"
  kLedCyan = 6,
  //% block="White"
  kLedWhite = 7,
}

declare const enum sentry_camera_white_balance_e {
  //% block="Auto"
  kAutoWhiteBalance = 0,
  //% block="Lock"
  kLockWhiteBalance = 1,
  //% block="WhiteLight"
  kWhiteLight = 2,
  //% block="YellowLight"
  kYellowLight = 3,
  //% blockHidden=true
  //% block="Calibrating"
  kWhiteBalanceCalibrating = 4,
}

declare const enum sentry_mode_e {
  //% block="Serial"
  kSerialMode = 0,
  //% block="I2C"
  kI2CMode = 1,
  //% blockHidden=true
  kUnknownMode,
}

declare const enum sentry2_status {
  //% block="run"
  Enable = 1,
  //% block="stop"
  Disable = 0,
}

declare const enum sentry_obj_info_e {
  //% block="status"
  //% blockHidden=true
  kStatus = 0,
  //% block="x-coord"
  kXValue = 1,
  //% block="y-coord"
  kYValue = 2,
  //% block="width"
  kWidthValue = 3,
  //% block="height"
  kHeightValue = 4,
  //% block="label"
  kLabel = 5,
  //% block="red CH value"
  //% blockHidden=true
  kRValue = 6,
  //% block="green CH value"
  //% blockHidden=true
  kGValue = 7,
  //% block="blue CH value"
  //% blockHidden=true
  kBValue = 8,
}

declare const enum sentry_color_info_e {
  //% block="label"
  kLabel = 5,
  //% block="red CH value"
  kRValue = 6,
  //% block="green CH value"
  kGValue = 7,
  //% block="blue CH value"
  kBValue = 8,
}

declare const enum sentry_Line_info_e {
  //% block="x-coord of ending point"
  kXValue = 1,
  //% block="y-coord of ending point"
  kYValue,
  //% block="x-coord of starting point"
  kWidthValue,
  //% block="y-coord of starting point"
  kHeightValue,
  //% block="inclination angle"
  kLabel,
}

declare const enum sentry_Custom_info_e {
  //% block="returnValue1"
  kXValue = 1,
  //% block="returnValue2"
  kYValue,
  //% block="returnValue3"
  kWidthValue,
  //% block="returnValue4"
  kHeightValue,
  //% block="returnValue5"
  kLabel,
}

declare const enum sentry_qr_info_e {
  //% block="x-coord"
  kXValue = 1,
  //% block="y-coord"
  kYValue,
  //% block="width"
  kWidthValue,
  //% block="height"
  kHeightValue,
}

declare const enum sentry2_addr_e {
  //% block="0x60"
  ADDR1 = 0x60,
  //% block="0x61"
  ADDR2 = 0x61,
  //% block="0x62"
  ADDR3 = 0x62,
  //% block="0x63"
  ADDR4 = 0x63,
}

//% color="#ff6600" icon="\uf085"
namespace sentry {
  const SENTRY_OK = 0x00;

  //% shim=tosee_sentry::sentry2_Begin
  function sentry2_Begin(mode: number, addr: number): number {
    console.log("sentry2_Begin " + addr.toString());
    return 0;
  }

  //% shim=tosee_sentry::sentry2_LedSetColor
  function sentry2_LedSetColor(
    detected_color: number,
    undetected_color: number,
    leval: number
  ): number {
    console.log("sentry2_LedSetColor " + detected_color.toString());
    return 0;
  }

  //% shim=tosee_sentry::sentry2_CameraSetAwb
  function sentry2_CameraSetAwb(wb: number): number {
    console.log("sentry2_CameraSetAwb " + wb.toString());
    return 0;
  }

  //% shim=tosee_sentry::sentry2_SetParamNum
  function sentry2_SetParamNum(vision_type: number, max_num: number): number {
    console.log("sentry2_SetParamNum " + vision_type.toString());
    return 0;
  }

  //% shim=tosee_sentry::sentry2_SetParam
  function sentry2_SetParam(
    vision_type: number,
    param: Buffer,
    param_id: number = 1
  ): number {
    console.log("sentry2_SetParam " + param.toHex());
    return 0;
  }

  //% shim=tosee_sentry::sentry2_VisionSetStatus
  function sentry2_VisionSetStatus(
    status: number,
    vision_type: number
  ): number {
    console.log("sentry2_VisionSetStatus " + vision_type.toString());
    return 0;
  }

  //% shim=tosee_sentry::sentry2_GetValue
  function sentry2_GetValue(
    vision_type: number,
    object_info: number = 0,
    obj_id: number = 1
  ): number {
    console.log("sentry2_GetValue " + vision_type.toString());
    return 0;
  }

  //% shim=tosee_sentry::sentry2_GetQrCodeValue
  function sentry2_GetQrCodeValue(): string {
    console.log("sentry2_GetQrCodeValue ");
    return "";
  }

  /**
   * Begin Sentry2.
   */
  //% blockId=Sentry2_begin block=" Initialize  Sentry2  port %mode |addr%addr "
  //% mode.defl=sentry_mode_e.kI2CMode
  //% group="Settings Blocks"
  //% weight=100
  export function Begin(mode: sentry_mode_e, addr: sentry2_addr_e) {
    while (sentry2_Begin(mode, addr) != SENTRY_OK);
  }

  /**
   * set led color.
   * @param id Sentry2 id
   * @param led led type.
   * @param detected_color led color while sensor detected target.
   * @param undetected_color led color while sensor undetected target.
   */
  //% blockId=Sentry2_led_set_color block=" Set  Sentry2  LEDs' color %detected_color|when targets were detected otherwise %undetected_color luma(1-15) %leval "
  //% detected_color.defl=sentry_led_color_e.kLedBlue
  //% undetected_color.defl=sentry_led_color_e.kLedRed
  //% leval.min=0 leval.max=15 leval.defl=1
  //% weight=99 inlineInputMode=inline
  //% blockHidden=true
  //% group="Settings Blocks"
  export function LedSetColor(
    detected_color: sentry_led_color_e,
    undetected_color: sentry_led_color_e,
    leval: number = 1
  ) {
    while (
      sentry2_LedSetColor(detected_color, undetected_color, leval) != SENTRY_OK
    );
  }

  /**
   * set camera white balance.
   * @param id Sentry id
   * @param wb white balance type.
   */
  //% blockId=Sentry_camera_set_awb block=" Set  Sentry2  white balance mode %wb"
  //% weight=99 inlineInputMode=inline
  //% group="Settings Blocks"
  export function CameraSetAwb(wb: sentry_camera_white_balance_e) {
    while (sentry2_CameraSetAwb(wb) != SENTRY_OK);
  }

  /**
   * Sentry2 vision enable set.
   */
  //% blockId=Sentry2_vision_Set block=" Set  Sentry2  %enable  algo %vision_type "
  //% group="Settings Blocks"
  //% weight=98
  export function VisionSetStatus(
    status: sentry2_status,
    vision_type: sentry_vision_e
  ) {
    while (sentry2_VisionSetStatus(status, vision_type) != SENTRY_OK);
  }

  /**
   * set vision prama number.
   * @param vision_type: vision type.
   * @param max_num max prama number.
   */
  //% blockId=Sentry2_vision_SetParamNum block=" Set  Sentry2  algo%vision_type  %max_num sets of params"
  //% max_num.min=1 max_num.max=25 max_num.defl=1
  //% group="Settings Blocks"
  //% weight=97
  export function SetParamNum(vision_type: sentry_vision_e_2, max_num: number) {
    while (sentry2_SetParamNum(<number>vision_type, max_num) != SENTRY_OK);
  }

  /**
   * color prama.
   * @param x ROI centre x.
   * @param y ROI centre y.
   * @param w ROI width.
   * @param h ROI height.
   */
  //% blockId=Sentry2_vision_color_param block=" Set  Sentry2  algo Color  x-coord%x| y-coord%y| width%w| height%h| paramset%obj_id "
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% x.defl=50
  //% y.defl=50
  //% w.defl=3
  //% h.defl=4
  //% inlineInputMode=inline
  //% group="Settings Blocks"
  //% weight=96
  export function SetColorParam(
    x: number,
    y: number,
    w: number,
    h: number,
    obj_id: number = 1
  ) {
    let prama = pins.createBuffer(10);
    prama.setNumber(NumberFormat.UInt16BE, 0, x);
    prama.setNumber(NumberFormat.UInt16BE, 2, y);
    prama.setNumber(NumberFormat.UInt16BE, 4, w);
    prama.setNumber(NumberFormat.UInt16BE, 6, h);

    while (
      sentry2_SetParam(sentry_vision_e.kVisionColor, prama, obj_id) != SENTRY_OK
    );
  }

  /**
   * blod prama.
   * @param w detecte min width.
   * @param h detecte min height.
   * @param l detecte lable.
   */
  //% blockId=Sentry2_vision_blob_param block=" Set  Sentry2  algo Blob  min-width%w| min-height%h| lable%l| paramset%obj_id "
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% w.defl=3
  //% h.defl=4
  //% l.defl=color_label_e.kColorRed
  //% inlineInputMode=inline
  //% group="Settings Blocks"
  //% weight=95
  export function SetBlobParam(
    w: number,
    h: number,
    l: color_label_e,
    obj_id: number = 1
  ) {
    let prama = pins.createBuffer(10);

    prama.setNumber(NumberFormat.UInt16BE, 4, w);
    prama.setNumber(NumberFormat.UInt16BE, 6, h);
    prama.setNumber(NumberFormat.UInt16BE, 8, l);

    while (
      sentry2_SetParam(sentry_vision_e.kVisionBlob, prama, obj_id) != SENTRY_OK
    );
  }
  /**
   * custom prama.
   * @param x param1.
   * @param y param2.
   * @param w param3.
   * @param h param4.
   * @param l param5.
   */
  //% blockId=Sentry2_vision_custom_param block=" Set  Sentry2  algo %vision_type  param1%x| param2%y| param3%w| param4%h| param5%l| paramset%obj_id "
  //% vision_type.defl=sentry_vision_e_2.kVisionCustom
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% inlineInputMode=inline
  //% group="Settings Blocks"
  //% weight=94
  export function SetCustomParam(
    vision_type: sentry_vision_e_2,
    x: number,
    y: number,
    w: number,
    h: number,
    l: number,
    obj_id: number = 1
  ) {
    let prama = pins.createBuffer(10);
    prama.setNumber(NumberFormat.UInt16BE, 0, x);
    prama.setNumber(NumberFormat.UInt16BE, 2, y);
    prama.setNumber(NumberFormat.UInt16BE, 4, w);
    prama.setNumber(NumberFormat.UInt16BE, 6, h);
    prama.setNumber(NumberFormat.UInt16BE, 8, l);

    while (
      sentry2_SetParam(sentry_vision_e.kVisionCustom, prama, obj_id) !=
      SENTRY_OK
    );
  }
  /**
   * Get vision detected number
   * @param type vision type
   */
  //% blockId=Sengo_detected block="  Sentry2  algo%vision_type  num of results" color="#2E8B57"
  //% group="Operation Blocks" advanced=false
  //% weight=94
  export function Detected(vision_type: sentry_vision_e): number {
    return sentry2_GetValue(<number>vision_type, 0, 1);
  }

  /**
   * Get the result of vision color recognition.
   * @param object_info Paramters type
   * @param obj_id:  object index
   */
  //% blockId=Sentry2_get_color_value block="  Sentry2  algo Color|  %object_info of result %obj_id" color="#2E8B57"
  //% inlineInputMode=inline
  //% expandableArgumentMode="enabled"
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% group="Operation Blocks"
  //% weight=93
  export function ColorRcgValue(
    object_info: sentry_color_info_e,
    obj_id: number = 1
  ): number {
    return GetValue(
      <number>sentry_vision_e.kVisionColor,
      <number>object_info,
      obj_id
    );
  }

  /**
   * get vision sentry2_object_t data, this function will update vision sentry2_object_t automatically.
   * @param vision_type: vision type.
   * @param object_info:  object information
   * @param obj_id:  object index
   */
  //% blockId=Sentry2_get_value block="  Sentry2  algo%vision_type  %object_info of result %obj_id" color="#2E8B57"
  //% inlineInputMode=inline
  //% expandableArgumentMode="enabled"
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% group="Operation Blocks"
  //% weight=92
  export function GetValue(
    vision_type: sentry_vision_e_1,
    object_info: sentry_obj_info_e,
    obj_id: number = 1
  ): number {
    return sentry2_GetValue(<number>vision_type, <number>object_info, obj_id);
  }

  /**
   * Get the result of vision Line value.
   * @param object_info Paramters type
   * @param obj_id:  object index
   */
  //% blockId=Sentry2_get_Line_value block="  Sentry2  algo Line  |%object_info of result %obj_id" color="#2E8B57"
  //% inlineInputMode=inline
  //% expandableArgumentMode="enabled"
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% group="Operation Blocks"
  //% weight=91
  export function LineValue(
    object_info: sentry_Line_info_e,
    obj_id: number = 1
  ): number {
    return GetValue(
      <number>sentry_vision_e.kVisionLine,
      <number>object_info,
      obj_id
    );
  }

  /**
   * Get the result of vision qr value.
   * @param object_info Paramters type
   * @param obj_id:  object index
   */
  //% blockId=Sentry2_get_qr_value block="  Sentry2  algo QrCode  |%object_info of result %obj_id" color="#2E8B57"
  //% inlineInputMode=inline
  //% expandableArgumentMode="enabled"
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% group="Operation Blocks"
  //% weight=90
  export function QrcodeValue(
    object_info: sentry_qr_info_e,
    obj_id: number = 1
  ): number {
    return GetValue(
        <number>sentry_vision_e.kVisionQrCode,
      <number>object_info,
      obj_id
    );
  }

  /**
   * Get the result of vision Qr value string.
   */
  //% blockId=Sentry2_get_Qrcode_value_string block="  Sentry2  algo QrCode  string  of decoding result" color="#2E8B57"
  //% inlineInputMode=inline
  //% expandableArgumentMode="enabled"
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% group="Operation Blocks"
  //% weight=89
  export function QrcodeValueString(): string {
    return sentry2_GetQrCodeValue();
  }
  /**
   * Get the result of vision Custom value.
   * @param object_info Paramters type
   * @param obj_id:  object index
   */
  //% blockId=Sentry2_get_Custom_value block="  Sentry2  algo Custom  |%object_info of result %obj_id" color="#2E8B57"
  //% inlineInputMode=inline
  //% expandableArgumentMode="enabled"
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% group="Operation Blocks"
  //% weight=88
  export function CustomValue(
    object_info: sentry_Custom_info_e,
    obj_id: number = 1
  ): number {
    return GetValue(
      <number>sentry_vision_e.kVisionCustom,
      <number>object_info,
      obj_id
    );
  }
  /**
   * Detected Color
   * @param lable Color lable
   * @param obj_id:  object index
   */
  //% blockId=Sentry2_detected_color block=" Sentry2  algo Color  recognized %lable result %obj_id" color="#2E8B57"
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% group="Operation Blocks"
  //% weight=87
  export function DetectedColor(
    lable: color_label_e,
    obj_id: number = 1
  ): boolean {
    return (
      GetValue(
        sentry_vision_e_1.kVisionColor,
        sentry_obj_info_e.kLabel,
        obj_id
      ) == lable
    );
  }

  /**
   * Detected Blob
   * @param lable Blob lable
   * @param obj_id:  object index
   */
  //% blockId=Sentry2_detected_blob block=" Sentry2  algo Blob  detected %lable blob result %obj_id " color="#2E8B57"
  //% lable.defl=color_label_e.kColorRed
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% group="Operation Blocks"
  //% weight=86
  export function DetectedBlob(
    lable: color_label_e,
    obj_id: number = 1
  ): boolean {
    return (
      GetValue(
        sentry_vision_e_1.kVisionBlob,
        sentry_obj_info_e.kLabel,
        obj_id
      ) == lable
    );
  }

  /**
   * Detected Card
   * @param lable Card lable
   * @param obj_id:  object index
   */
  //% blockId=Sentry2_detected_card block=" Sentry2  algo Card  recognized %lable result %obj_id " color="#2E8B57"
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% group="Operation Blocks"
  //% weight=85
  export function DetectedCard(
    lable: card_label_e,
    obj_id: number = 1
  ): boolean {
    return (
      GetValue(
        sentry_vision_e_1.kVisionCard,
        sentry_obj_info_e.kLabel,
        obj_id
      ) == lable
    );
  }
  /**
   * Detected class20
   * @param lable 20Class lable
   * @param obj_id:  object index
   */
  //% blockId=Sentry_detected_class20 block=" Sentry2  algo 20Class  recognized %lable result %obj_id " color="#2E8B57"
  //% obj_id.min=1 obj_id.max=25 obj_id.defl=1
  //% group="Operation Blocks"
  //% weight=84
  export function Detected20Class(
    lable: class20_label_e,
    obj_id: number = 1
  ): boolean {
    return (
      GetValue(
        sentry_vision_e_1.kVision20Classes,
        sentry_obj_info_e.kLabel,
        obj_id
      ) == lable
    );
  }
}
