#!/bin/sh
links=(
    # Main page
    /index.html

    # Favicon
    /favicon.ico

    # Style
    /assets/css/style.css

    # Fonts
    /assets/fonts/itcavantgardeprobk.eot
    /assets/fonts/itcavantgardeprobk.woff
    /assets/fonts/itcavantgardeprobk.ttf
    /assets/fonts/itcavantgardeprobk.svg

    /assets/fonts/itcavantgardeproboldobl.eot
    /assets/fonts/itcavantgardeproboldobl.woff
    /assets/fonts/itcavantgardeproboldobl.ttf
    /assets/fonts/itcavantgardeproboldobl.svg

    # JS
    /assets/js/racer.js
    /assets/data/mobile.js
    /assets/data/desktop.js
    /assets/js/lib/paper.js
    /assets/js/hydra/hydra-thread.js

    # Sounds
    /assets/sounds/config.xml
    /assets/sounds/KickBass_1_8.mp3
    /assets/sounds/KickBass_1_7.mp3
    /assets/sounds/KickBass_1_5.mp3
    /assets/sounds/KickBass_1_3.mp3
    /assets/sounds/KickBass_1_1.mp3
    /assets/sounds/HiHat_1_1.mp3
    /assets/sounds/FX_Click.mp3
    /assets/sounds/FX_StartRaceClick.mp3
    /assets/sounds/FX_ProtipOut.mp3
    /assets/sounds/FX_LogoOut.mp3
    /assets/sounds/FX_ProtipIn.mp3
    /assets/sounds/FX_Leave.mp3
    /assets/sounds/FX_Laser.mp3
    /assets/sounds/FX_Join.mp3
    /assets/sounds/FX_GenericSwooshOut.mp3
    /assets/sounds/FX_GenericSwooshIn.mp3
    /assets/sounds/FX_Error.mp3
    /assets/sounds/FX_ChangeName.mp3
    /assets/sounds/FX_CarPlace.mp3
    /assets/sounds/Cowbell_1_1.mp3
    /assets/sounds/Arp_4_1.mp3
    /assets/sounds/Arp_1_1.mp3
    /assets/sounds/Car_SlowDown_2.mp3
    /assets/sounds/Car_DriveAndLoop.m4a
    /assets/sounds/FX_Go.mp3
    /assets/sounds/Fanfare_5.mp3
    /assets/sounds/Fanfare_4.mp3
    /assets/sounds/Fanfare_3.mp3
    /assets/sounds/Fanfare_2.mp3
    /assets/sounds/CarCrash1_4.mp3
    /assets/sounds/CarCrash1_2.mp3
    /assets/sounds/Bridge_1_7.mp3
    /assets/sounds/Bridge_1_6.mp3
    /assets/sounds/Bridge_1_2.mp3
    /assets/sounds/Car_IdleLoop_5s.m4a
    /assets/sounds/FX_Ready.mp3
    /assets/sounds/FX_Skid.mp3
    /assets/sounds/FX_TapReady.mp3
    /assets/sounds/FX_Finished.mp3
    /assets/sounds/CarCrash1_1.mp3
    /assets/sounds/Bridge_1_8.mp3
    /assets/sounds/Bridge_1_5.mp3
    /assets/sounds/Bridge_1_4.mp3
    /assets/sounds/Bridge_1_3.mp3
    /assets/sounds/Bridge_1_1.mp3
    /assets/sounds/FX_FinalLap.mp3
    /assets/sounds/FX_Lap.mp3
    /assets/sounds/Fanfare_1.mp3
    /assets/sounds/Race_1.mp3
    /assets/sounds/Race_2.mp3
    
    # Images
    /assets/images/about/gradient-top.png
    /assets/images/about/gradient-bottom.png
    /assets/images/common/places/1.png
    /assets/images/common/places/0.png
    /assets/images/common/places/1.png
    /assets/images/common/places/2.png
    /assets/images/common/places/3.png
    /assets/images/common/places/4.png
    /assets/images/common/logos/appstore.png
    /assets/images/track/touchglow/blue.png
    /assets/images/track/cars/blue.png
    /assets/images/common/logos/chrome-experiment.png
    /assets/images/common/logos/chrome.png
    /assets/images/common/close.png
    /assets/images/lineup/dotted-line.png
    /assets/images/common/devices/droid-razr.png
    /assets/images/common/places/empty.png
    /assets/images/lineup/fade-left.png
    /assets/images/lineup/fade-right.png
    /assets/images/common/devices/galaxy-nexus.png
    /assets/images/track/loader/glow.png
    /assets/images/track/touchglow/green.png
    /assets/images/track/cars/green.png
    /assets/images/common/devices/ipad-mini.png
    /assets/images/common/devices/ipad.png
    /assets/images/common/devices/iphone-4.png
    /assets/images/common/devices/iphone-5.png
    /assets/images/track/name-bg.png
    /assets/images/common/devices/nexus-4.png
    /assets/images/common/devices/nexus-7.png
    /assets/images/common/devices/nexus-10.png
    /assets/images/track/touchglow/orange.png
    /assets/images/track/cars/orange.png
    /assets/images/common/logos/play.png
    /assets/images/common/logos/racer-large-mobile.png
    /assets/images/common/logos/racer-large.png
    /assets/images/common/logos/racer-small.png
    /assets/images/common/logos/racer.png
    /assets/images/common/spin-loader.png
    /assets/images/track/touchglow/red.png
    /assets/images/track/cars/red.png
    /assets/images/common/devices/samsung-epic-4g.png
    /assets/images/common/devices/samsung-galaxy-ace.png
    /assets/images/common/devices/samsung-galaxy-note-2.png
    /assets/images/common/devices/samsung-galaxy-s2.png
    /assets/images/common/devices/samsung-galaxy-s3.png
    /assets/images/common/devices/samsung-galaxy-tab-2.png
    /assets/images/common/devices/samsung-galaxy-y.png
    /assets/images/track/loader/scan.png
    /assets/images/track/banner/shadow.png
    /assets/images/common/logos/share.png
    /assets/images/track/startline.png
    /assets/images/lineup/tick.png
    /assets/images/track/loader/track.png
    /assets/images/track/win-outline.gif
    /assets/images/track/touchglow/yellow.png
    /assets/images/track/cars/yellow.png
    /assets/images/lineup/you-triangle-dark.png
    /assets/images/lineup/you-triangle.png
    /assets/images/content/hands.jpg
    /assets/images/common/logos/youtube.png
    /assets/images/common/logos/racer-fallback.png
    /assets/images/common/logos/chrome-small.png
    /assets/images/lineup/you-triangle.png
    /assets/sprites/crash/blue.png
    /assets/sprites/crash/green.png

)

for item in ${links[*]}
do
    if [ ! -e client${item} ]; then
        echo "Downloading client${item}..."

        mkdir -p client$(dirname $item)
        curl --compressed -L "https://chrome.com/racer${item}" -o client$item
    fi
    
    prettier -c client${item} &> /dev/null && continue

    echo "Prettifying client${item}..."
    prettier --write client${item}

done
