ionic cordova build android --prod --release
"C:\Program Files\Java\jdk1.8.0_60\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore fitness-app-example.jks "E:\Dev\fitness-app-example\platforms\android\build\outputs\apk\android-release-unsigned.apk" fitness-app-example
"C:\Users\XXX\AppData\Local\Android\sdk\build-tools\25.0.3\zipalign" -v 4 "E:\Dev\fitness-app-example\platforms\android\build\outputs\apk\android-release-unsigned.apk" "E:\Dev\fitness-app-example\fitness-app-example.apk"
