
> 在 [https://uniquemf.github.io/sentry/](https://uniquemf.github.io/sentry/) 打开此页面

## 用作扩展

此仓库可以作为 **插件** 添加到 MakeCode 中。

* 打开 [https://makecode.microbit.org/](https://makecode.microbit.org/)
* 点击 **新项目**
* 点击齿轮图标菜单下的 **扩展**
* 搜索 **https://github.com/uniquemf/sentry** 并导入

## 编辑此项目 ![构建状态标志](https://github.com/uniquemf/sentry/workflows/MakeCode/badge.svg)

在 MakeCode 中编辑此仓库。

* 打开 [https://makecode.microbit.org/](https://makecode.microbit.org/)
* 点击 **导入**，然后点击 **导入 URL**
* 粘贴 **https://github.com/uniquemf/sentry** 并点击导入

## 积木块预览

* Get vision result

```blocks
// Initialized Sentry with I2C port
Sentry.Begin(SentryId.Sentry00, sentry_mode_e.kI2CMode)
Sentry.VisionSetStatus(SentryId.Sentry00, SentryStatus.Enable, sentry_vision_e.kVisionQrCode)
Sentry.LedSetColor(SentryId.Sentry00, sentry_led_color_e.kLedBlue, sentry_led_color_e.kLedGreen, 1)
basic.forever(function () {
    for (let index = 0; index <= Sentry.Detected(SentryId.Sentry00, sentry_vision_e.kVisionQrCode) - 1; index++) {
        serial.writeValue("x", Sentry.QrRcgValue(SentryId.Sentry00, sentry_qr_info_e.kXValue))
        serial.writeValue("y", Sentry.QrRcgValue(SentryId.Sentry00, sentry_qr_info_e.kYValue))
        serial.writeValue("w", Sentry.QrRcgValue(SentryId.Sentry00, sentry_qr_info_e.kWidthValue))
        serial.writeValue("h", Sentry.QrRcgValue(SentryId.Sentry00, sentry_qr_info_e.kHeightValue))
        serial.writeLine(Sentry.GetQrCodeValue(SentryId.Sentry00))
    }
    basic.pause(2000)
})

```

#### 元数据（用于搜索、渲染）

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
