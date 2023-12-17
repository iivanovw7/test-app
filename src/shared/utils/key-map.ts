/**
 * A const enum that includes all non-printable string values one can expect from $event.key.
 * For example, this enum includes values like "CapsLock", "Backspace", and "AudioVolumeMute",
 * but does not include values like "a", "A", "#", "é", or "¿".
 * Auto generated from MDN:
 *      https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#Speech_recognition_keys
 */
export const KeyMap = {
    /**
     * Decreases trhe audio description's mixing volume;
     * reduces the volume of the audio descriptions relative to the program sound.
     */
    TVAudioDescriptionMixDown: "TVAudioDescriptionMixDown",

    /** The Alt (Alternative) key. */

    /**
     * Increases the audio description's mixing volume;
     * increases the volume of the audio descriptions relative to the program sound.
     */
    TVAudioDescriptionMixUp: "TVAudioDescriptionMixUp",

    /** Selects the next available surround sound mode. */
    AudioSurroundModeNext: "AudioSurroundModeNext",

    /** Toggles bass boosting on and off. */
    AudioBassBoostToggle: "AudioBassBoostToggle",

    /** Decreases the microphone's input volume. */
    MicrophoneVolumeDown: "MicrophoneVolumeDown",

    /** Mutes the microphone input. */
    MicrophoneVolumeMute: "MicrophoneVolumeMute",

    /** Presents a list of possible corrections for a word which was incorrectly identified. */
    SpeechCorrectionList: "SpeechCorrectionList",

    /** Selects digital terrestrial television service (digital cable or antenna receiption). */
    TVTerrestrialDigital: "TVTerrestrialDigital",

    /** Toggles closed captioning on and off. */
    ClosedCaptionToggle: "ClosedCaptionToggle",

    /** The 10th generic application launcher button. */
    LaunchApplication10: "LaunchApplication10",

    /** The 11th generic application launcher button. */
    LaunchApplication11: "LaunchApplication11",

    /** The 12th generic application launcher button. */
    LaunchApplication12: "LaunchApplication12",

    /** The 13th generic application launcher button. */
    LaunchApplication13: "LaunchApplication13",

    /** The Symbol modifier key (found on certain virtual keyboards). */

    /** The 14th generic application launcher button. */
    LaunchApplication14: "LaunchApplication14",

    /** The 15th generic application launcher button. */
    LaunchApplication15: "LaunchApplication15",

    /** The 16th generic application launcher button. */
    LaunchApplication16: "LaunchApplication16",

    /**
     * The Word Processor key. This may be an icon of a specific word processor application,
     * or a generic document icon.
     */
    LaunchWordProcessor: "LaunchWordProcessor",

    /** Cycles to the next channel in the favorites list. */
    NextFavoriteChannel: "NextFavoriteChannel",

    /** Selects analog terrestrial television service (analog cable or antenna reception). */
    TVTerrestrialAnalog: "TVTerrestrialAnalog",

    /** Reduces bass boosting or cycles downward through bass boost modes or states. */
    AudioBassBoostDown: "AudioBassBoostDown",

    /** The first generic application launcher button. */
    LaunchApplication1: "LaunchApplication1",

    /** The second generic application launcher button. */
    LaunchApplication2: "LaunchApplication2",

    /** The third generic application launcher button. */
    LaunchApplication3: "LaunchApplication3",

    /** The fourth generic application launcher button. */
    LaunchApplication4: "LaunchApplication4",

    /** The fifth generic application launcher button. */
    LaunchApplication5: "LaunchApplication5",

    /** The sixth generic application launcher button. */
    LaunchApplication6: "LaunchApplication6",

    /** The seventh generic application launcher button. */
    LaunchApplication7: "LaunchApplication7",

    /** The eighth generic application launcher button. */
    LaunchApplication8: "LaunchApplication8",

    /** The ninth generic application launcher button. */
    LaunchApplication9: "LaunchApplication9",

    /** Seeks to the previous media or program track. */
    MediaTrackPrevious: "MediaTrackPrevious",

    /** Increases the microphone's input volume. */
    MicrophoneVolumeUp: "MicrophoneVolumeUp",

    /**
     * Toggles the channel scan mode on and off.
     * This is a mode which flips through channels automatically until the user stops the scan.
     */
    ScanChannelsToggle: "ScanChannelsToggle",

    /** Toggles audio description mode on and off. */
    TVAudioDescription: "TVAudioDescription",

    /** Adjusts audio balance toward the right. */
    AudioBalanceRight: "AudioBalanceRight",

    /** The Media Player key. */
    LaunchMediaPlayer: "LaunchMediaPlayer",

    /** The Music Player key. Often labeled with an icon. */
    LaunchMusicPlayer: "LaunchMusicPlayer",

    /** The Screen Saver key. */
    LaunchScreenSaver: "LaunchScreenSaver",

    /** The Spreadsheet key. This key may be labeled with an icon. */
    LaunchSpreadsheet: "LaunchSpreadsheet",

    /** Skips backward to the previous content or program. */
    MediaSkipBackward: "MediaSkipBackward",

    /** Steps backward to the previous content or program. */
    MediaStepBackward: "MediaStepBackward",

    /** The Previous Candidate key. Selects the previous possible match for the ongoing input. */
    PreviousCandidate: "PreviousCandidate",

    /**
     * Toggles between dictation mode and command/control mode.
     * This lets the speech engine know whether to interpret spoken words as input text or as commands.
     */
    SpeechInputToggle: "SpeechInputToggle",

    /** Toggles split screen display mode on and off. */
    SplitScreenToggle: "SplitScreenToggle",

    /** Switches to the input "Component 1." */
    TVInputComponent1: "TVInputComponent1",

    /** Switches to the input "Component 2." */
    TVInputComponent2: "TVInputComponent2",

    /** Switches to the input "Composite 1." */
    TVInputComposite1: "TVInputComposite1",

    /** Switches to the input "Composite 2." */
    TVInputComposite2: "TVInputComposite2",

    /** Toggles among available satellites. */
    TVSatelliteToggle: "TVSatelliteToggle",

    /** Adjusts audio balance toward the left. */
    AudioBalanceLeft: "AudioBalanceLeft",

    /** Increases the amoung of bass boosting, or cycles upward through a set of bass boost modes or states. */
    AudioBassBoostUp: "AudioBassBoostUp",

    /** Opens the user's list of bookmarks/favorites. */
    BrowserFavorites: "BrowserFavorites",

    /** If the guide is currently displayed, this button tells the guide to display the previous day's content. */
    GuidePreviousDay: "GuidePreviousDay",

    /** Toggles between the Hiragana and Katakana writing systems. */
    HiraganaKatakana: "HiraganaKatakana",

    /** The Redial button. Redials the last-called number. */
    LastNumberRedial: "LastNumberRedial",

    /**
     *  The Calculator key, often labeled with an icon. This is often used as a generic application launcher key
     *  (APPCOMMAND_LAUNCH_APP2).
     */
    LaunchCalculator: "LaunchCalculator",

    /**
     * The Computer key on Windows keyboards.
     * This is often used as a generic application launcher key (APPCOMMAND_LAUNCH_APP1).
     */
    LaunchMyComputer: "LaunchMyComputer",

    /** The Web Browser key. This key is frequently labeled with an icon. */
    LaunchWebBrowser: "LaunchWebBrowser",

    /** Starts, continues, or increases the speed of fast forwarding the media. */
    MediaFastForward: "MediaFastForward",

    /** Skips forward to the next content or program. */
    MediaSkipForward: "MediaSkipForward",

    /** Steps forward to the next content or program. */
    MediaStepForward: "MediaStepForward",

    /** Toggles the microphone on and off. */
    MicrophoneToggle: "MicrophoneToggle",

    /** Navigates to the previous item. */
    NavigatePrevious: "NavigatePrevious",

    /** Adjusts the audio fader toward the front. */
    AudioFaderFront: "AudioFaderFront",

    /** Decreases the amount of treble. */
    AudioTrebleDown: "AudioTrebleDown",

    /** Decreases the audio volume. */
    AudioVolumeDown: "AudioVolumeDown",

    /** Mutes the audio. */
    AudioVolumeMute: "AudioVolumeMute",

    /** Selects (recalls) the program or content stored in the first favorites list slot. */
    FavoriteRecall0: "FavoriteRecall0",

    /** Selects (recalls) the program or content stored in the second favorites list slot. */
    FavoriteRecall1: "FavoriteRecall1",

    /** Selects (recalls) the program or content stored in the third favorites list slot. */
    FavoriteRecall2: "FavoriteRecall2",

    /** Selects (recalls) the program or content stored in the fourth favorites list slot. */
    FavoriteRecall3: "FavoriteRecall3",

    /** The Audio Track key. */
    MediaAudioTrack: "MediaAudioTrack",

    /** Cycles to the next saved user profile, if this feature is supported and multiple profiles exist. */
    NextUserProfile: "NextUserProfile",

    /** Cycles among the available media recording speeds. */
    RecordSpeedNext: "RecordSpeedNext",

    /**
     * The Single Candidate key. Enables single candidate mode (as opposed to multi-candidate mode);
     * in this mode, only one candidate is displayed at a time.
     */
    SingleCandidate: "SingleCandidate",

    /** Adjusts the audio fader toward the rear. */
    AudioFaderRear: "AudioFaderRear",

    /** The Brightness Down key. Typically used to reduce the brightness of the display. */
    BrightnessDown: "BrightnessDown",

    /** Navigates to the next content or page in the current Web view's history. */
    BrowserForward: "BrowserForward",

    /** Refreshes the current page or content. */
    BrowserRefresh: "BrowserRefresh",

    /** Clears the program or content stored in the first favorites list slot. */
    FavoriteClear0: "FavoriteClear0",

    /** Clears the program or content stored in the second favorites list slot. */
    FavoriteClear1: "FavoriteClear1",

    /** Clears the program or content stored in the third favorites list slot. */
    FavoriteClear2: "FavoriteClear2",

    /** Clears the program or content stored in the fourth favorites list slot. */
    FavoriteClear3: "FavoriteClear3",

    /** Stores the current program or content into the first favorites list slot. */
    FavoriteStore0: "FavoriteStore0",

    /** Stores the current program or content into the second favorites list slot. */
    FavoriteStore1: "FavoriteStore1",

    /** Stores the current program or content into the third favorites list slot. */
    FavoriteStore2: "FavoriteStore2",

    /** Stores the current program or content into the fourth favorites list slot. */
    FavoriteStore3: "FavoriteStore3",

    /** The Calendar key. Often labeled with an icon. */
    LaunchCalendar: "LaunchCalendar",

    /** The Contacts key. */
    LaunchContacts: "LaunchContacts",

    /** Toggles between playing and pausing the current media. */
    MediaPlayPause: "MediaPlayPause",

    /** Seeks to the next media or program track. */
    MediaTrackNext: "MediaTrackNext",

    /** Returns the media playback rate to normal. */
    PlaySpeedReset: "PlaySpeedReset",

    /** Cycles through the available screen display modes. */
    ScreenModeNext: "ScreenModeNext",

    /** Toggles between antenna and cable inputs. */
    TVAntennaCable: "TVAntennaCable",

    /**
     * Displays or hides the media contents available for playback
     * (this may be a channel guide showing the currently airing programs, or a list of media files to play).
     */
    TVContentsMenu: "TVContentsMenu",

    /** The Media Context menu key. */
    TVMediaContext: "TVMediaContext",

    /** Radio button. */
    TVRadioService: "TVRadioService",

    /**
     * All Candidates key, which starts multi-candidate mode,
     * in which multiple candidates are displayed for the ongoing input.
     */
    AllCandidates: "AllCandidates",

    /** Decreases the amount of bass. */
    AudioBassDown: "AudioBassDown",

    /** Increases the amount of treble. */
    AudioTrebleUp: "AudioTrebleUp",

    /** Increases the audio volume. */
    AudioVolumeUp: "AudioVolumeUp",

    /** Activates the user's preferred search engine or the search interface within their browser. */
    BrowserSearch: "BrowserSearch",

    /** General-purpose media funciton key, color-coded yellow. This has index 2 among the colored keys. */
    ColorF2Yellow: "ColorF2Yellow",

    /** Switches to the previous character group on an ISO/IEC 9995 keyboard. */
    GroupPrevious: "GroupPrevious",

    /**
     * Tells the device to perform an instant replay
     * (typically some form of jumping back a short amount of time then playing it again,
     * possibly but not usually in slow motion).
     */
    InstantReplay: "InstantReplay",

    /** The Next Candidate function key. Selects the next possible match for the ongoing input. */
    NextCandidate: "NextCandidate",

    /** Decreases the media playback rate. */
    PlaySpeedDown: "PlaySpeedDown",

    /** Displays or hides the TV's data service menu. */
    TVDataService: "TVDataService",

    /** Put the TV into number entry mode. */
    TVNumberEntry: "TVNumberEntry",

    /** Broadcast Satellite button. */
    TVSatelliteBS: "TVSatelliteBS",

    /** Communication Satellite button. */
    TVSatelliteCS: "TVSatelliteCS",

    /** Cycles through the available video modes. */
    VideoModeNext: "VideoModeNext",

    /** The Zenkaku/Hankaku (full width/half width) toggle key. */
    ZenkakuHanaku: "ZenkakuHanaku",

    /** The Alphanumeric key. */
    Alphanumeric: "Alphanumeric",

    /** The Brightness Up key. Typically, increases the brightness of the display. */
    BrightnessUp: "BrightnessUp",

    /** General-purpose media funciton key, color-coded green. This has index 1 among the colored keys. */
    ColorF1Green: "ColorF1Green",

    /** General-purpose media funciton key, color-coded brown. This has index 5 among the colored keys. */
    ColorF5Brown: "ColorF5Brown",

    /** If the guide is currently displayed, this button tells the guide to display the next day's content. */
    GuideNextDay: "GuideNextDay",

    /** The WebCam key. Opens the webcam application. */
    LaunchWebCam: "LaunchWebCam",

    /** Top Menu button. Opens the media's main menu (e.g., for a DVD or Blu-Ray disc). */
    MediaTopMenu: "MediaTopMenu",

    /** Navigates to the next item. */
    NavigateNext: "NavigateNext",

    Notification: "Notification",

    /** Toggles random media (also known as "shuffle mode") on and off. */
    RandomToggle: "RandomToggle",

    /**
     * A code sent when the remote control's battery is low.
     * This doesn't actually correspond to a physical key at all.
     */
    RcLowBattery: "RcLowBattery",

    /** Switches to the input "HDMI 1." */
    TVInputHDMI1: "TVInputHDMI1",

    /** Switches to the input "HDMI 2." */
    TVInputHDMI2: "TVInputHDMI2",

    /** Switches to the input "HDMI 3." */
    TVInputHDMI3: "TVInputHDMI3",

    /** The Notification key. */

    /** Switches to the input "HDMI 4." */
    TVInputHDMI4: "TVInputHDMI4",

    /**
     * The user agent wasn't able to map the event's virtual keycode to a specific key value.
     * This can happen due to hardware or software constraints,
     *      or because of constraints around the platform on which the user agent is running.
     */
    Unidentified: "Unidentified",

    /** Increases the amount of bass. */
    AudioBassUp: "AudioBassUp",

    /** Navigates to the previous content or page in the current Web view's history. */
    BrowserBack: "BrowserBack",

    /** Navigates to the user's preferred home page. */
    BrowserHome: "BrowserHome",

    /** Stops loading the currently displayed Web view or content. */
    BrowserStop: "BrowserStop",

    /** The Focus key. Focuses the camera. */
    CameraFocus: "CameraFocus",

    /** Switches to the previous channel. */
    ChannelDown: "ChannelDown",

    /** General-purpose media funciton key, color-coded blue. This has index 3 among the colored keys. */
    ColorF3Blue: "ColorF3Blue",

    /** General-purpose media funciton key, color-coded grey. This has index 4 among the colored keys. */
    ColorF4Grey: "ColorF4Grey",

    /**
     * Shows the context menu. Typically found between the Windows (or OS) key and
     * the Control key on the right side of the keyboard.
     */
    ContextMenu: "ContextMenu",

    /** Cycles among video sources. */
    DisplaySwap: "DisplaySwap",

    /**
     * The Headset Hook key.
     * This is typically actually a button on the headset which is used to hang up calls and play or pause media.
     */
    HeadsetHook: "HeadsetHook",

    /** The Phone key. Opens the phone dialer application (if one is present). */
    LaunchPhone: "LaunchPhone",

    /** Lists the current program. */
    ListProgram: "ListProgram",

    /** Toggles a display listing currently available live content or programs. */
    LiveContent: "LiveContent",

    /** Opens the user interface to forward a message. */
    MailForward: "MailForward",

    /** Starts or resumes recording media. */
    MediaRecord: "MediaRecord",

    /** Starts, continues, or increases the speed of rewinding the media. */
    MediaRewind: "MediaRewind",

    /** Navigates out of the current screen or menu. */
    NavigateOut: "NavigateOut",

    /** Increases the media playback rate. */
    PlaySpeedUp: "PlaySpeedUp",

    /** The PrintScreen or PrtScr key. Sometimes SnapShot. Captures the screen and prints it or saves it to disk. */
    PrintScreen: "PrintScreen",

    /** Switches to the input "VGA 1." */
    TVInputVGA1: "TVInputVGA1",

    /** Satellite button. */
    TVSatellite: "TVSatellite",

    /** The right arrow key. */
    ArrowRight: "ArrowRight",

    /** General-purpose media function key, color-coded red. This has index 0 among the colored keys. */
    ColorF0Red: "ColorF0Red",

    /**
     * Switches to the first character group on an ISO/IEC 9995 keyboard.
     * Each key may have multiple groups of characters, each in its own column.
     * Pressing this key instructs the device to interpret
     * keypresses as coming from the first column on subsequent keystrokes.
     */
    GroupFirst: "GroupFirst",

    /** The Hangul (Korean character set) mode key, which toggles between Hangul and English entry modes. */
    HangulMode: "HangulMode",

    /** The Mail key. Often labeled with an icon. */
    LaunchMail: "LaunchMail",

    /** A button which cycles among the notification modes: silent, vibrate, ring, and so forth. */
    MannerMode: "MannerMode",

    /**
     * Pauses the currently playing media.
     * Note: Some older applications use "Pause", but this is not correct.
     */
    MediaPause: "MediaPause",

    /** The Mode Change key. Toggles or cycles among input modes of IMEs. */
    ModeChange: "ModeChange",

    /** Navigates into a submenu or option. */
    NavigateIn: "NavigateIn",

    /**
     *  The NonConvert ("Don't convert") key.
     *  This accepts the current input method sequence without running conversion when using an IME.
     */
    NonConvert: "NonConvert",

    /** Toggles display of th epicture-in-picture view on and off. */
    PinPToggle: "PinPToggle",

    /** The Scroll Lock key. Toggles between scrolling and cursor movement modes. */
    ScrollLock: "ScrollLock",

    /** Starts spell checking the current document. */
    SpellCheck: "SpellCheck",

    /** The Symbol Lock key. */
    SymbolLock: "SymbolLock",

    /** Toggles between full-screen and scaled content display, or otherwise change the magnification level. */
    ZoomToggle: "ZoomToggle",

    /** Presents a list of recently-used applications which lets the user change apps quickly. */
    AppSwitch: "AppSwitch",

    /** The down arrow key. */
    ArrowDown: "ArrowDown",

    /** The left arrow key. */
    ArrowLeft: "ArrowLeft",

    /** The Backspace key. This key is labeled Delete on Mac keyboards. */
    Backspace: "Backspace",

    /** Switches to the next channel. */
    ChannelUp: "ChannelUp",

    /**
     * The Code Input key, which enables code input mode,
     * which lets the user enter characters by typing their code points (their Unicode character numbers, typically).
     */
    CodeInput: "CodeInput",

    /** The Final (Final Mode) key is used on some Asian keyboards to enter final mode when using IMEs. */
    FinalMode: "FinalMode",

    /** Switches to the last character group on an ISO/IEC 9995 keyboard. */
    GroupLast: "GroupLast",

    /** Switches to the next character group on an ISO/IEC 9995 keyboard. */
    GroupNext: "GroupNext",

    /** Selects the Hanja mode, for converting Hangul characters to the more specific Hanja characters. */
    HanjaMode: "HanjaMode",

    /**
     * The Hibernate key.
     * This saves the state of the computer to disk and then shuts down;
     * the computer can be returned to its previous state by restoring the saved state information.
     */
    Hibernate: "Hibernate",

    /** Selects the Junja mode, in which Korean is represented using single-byte Latin characters. */
    JunjaMode: "JunjaMode",

    /** The Kanji Mode key. Enables entering Japanese text using the ideographic characters of Chinese origin. */
    KanjiMode: "KanjiMode",

    /** Opens the user interface to reply to a message. */
    MailReply: "MailReply",

    /** Presents a list of media applications, such as photo viewers, audio and video players, and games. [1] */
    MediaApps: "MediaApps",

    /** Jumps back to the last-viewed content, program, or other media. */
    MediaLast: "MediaLast",

    /** Starts or continues playing media at normal speed, if not already doing so. Has no effect otherwise. */
    MediaPlay: "MediaPlay",

    /**
     * Stops the current media activity (such as playing, recording, pausing, forwarding, or rewinding).
     * Has no effect if the media is currently stopped already.
     */
    MediaStop: "MediaStop",

    /**
     * The numeric keypad's places separator character.
     * (In the United States this is a comma, but elsewhere it is frequently a period.)
     */
    Separator: "Separator",

    /** Toggle the TV's network connection on and off. */
    TVNetwork: "TVNetwork",

    /** The Voice Dial key. Initiates voice dialing. */
    VoiceDial: "VoiceDial",

    /** Changes the input mode on an external audio/video receiver (AVR) unit. */
    AVRInput: "AVRInput",

    /** Toggles the power on an external AVR unit. */
    AVRPower: "AVRPower",

    /**
     * The AltGr or AltGraph (Alternate Graphics) key.
     * Enables the ISO Level 3 shift modifier (where Shift is the level 2 modifier).
     */
    AltGraph: "AltGraph",

    /** The Caps Lock key. Toggles the capital character lock on and off for subsequent input. */
    CapsLock: "CapsLock",

    /**
     * Erase to End of Field. Deletes all characters from the current cursor position to the end of the current field.
     */
    EraseEof: "EraseEof",

    /** The Hiragana key; selects Kana characters mode. */
    Hiragana: "Hiragana",

    /** The Kana Mode (Kana Lock) key. */
    KanaMode: "KanaMode",

    /** The Katakana key. */
    Katakana: "Katakana",

    /** Sends the current message. */
    MailSend: "MailSend",

    /** The numeric keypad's multiplication key, *. */
    Multiply: "Multiply",

    /** Opens the user interface for selecting on demand content or programs to watch. */
    OnDemand: "OnDemand",

    /** The Page Down (or PgDn) key. Scrolls down or displays the next page of content. */
    PageDown: "PageDown",

    /** A button to move the picture-in-picture view downward. */
    PinPDown: "PinPDown",

    /** A button to control moving the picture-in-picture view. */
    PinPMove: "PinPMove",

    /** The PowerOff or PowerDown key. Shuts off the system. */
    PowerOff: "PowerOff",

    /**
     * Toggles radio frequency (RF) input bypass mode on and off.
     * RF bypass mode passes RF input directly to the RF output without any processing or filtering.
     */
    RfBypass: "RfBypass",

    /** Cycles among input modes on an external set-top box (STB). */
    STBInput: "STBInput",

    /** Toggles on and off an external STB. */
    STBPower: "STBPower",

    /** Toggles display of the device's settings screen on and off. */
    Settings: "Settings",

    /** Toggles the display of subtitles on and off if they're available. */
    Subtitle: "Subtitle",

    /** The numeric keypad's subtraction key, -. */
    Subtract: "Subtract",

    /** Toggles 3D TV mode on and off. */
    TV3DMode: "TV3DMode",

    /** Toggles display of teletext, if available. */
    Teletext: "Teletext",

    /** The up arrow key. */
    ArrowUp: "ArrowUp",

    /** The Compose key. */
    Compose: "Compose",

    /** The Control, Ctrl, or Ctl key. Allows typing control characters. */
    Control: "Control",

    /**
     *  The Convert key, which instructs the IME to convert the current
     *  input method sequence into the resulting character.
     */
    Convert: "Convert",

    /**
     * The decimal point key (typically . or , depending on the region).
     * In newer browsers, this value to be the character generated by the decimal key (one of those two characters). [1]
     */
    Decimal: "Decimal",

    /** The End Call or Hang Up button. */
    EndCall: "EndCall",

    /** The Execute key. */
    Execute: "Execute",

    /** The Hankaku (half-width characters) key. */
    Hankaku: "Hankaku",

    /**
     * The NumLock (Number Lock) key.
     * Toggles the numeric keypad between number entry some other mode (often directional arrows).
     */
    NumLock: "NumLock",

    /** Starts the process of pairing the remote with a device to be controlled. */
    Pairing: "Pairing",

    /** The Process key. Instructs the IME to process the conversion. */
    Process: "Process",

    /**
     * The Standby key. (Also known as Suspend or Sleep.)
     * This turns off the display and puts the computer in a low power consumption mode,
     * without completely powering off.
     */
    Standby: "Standby",

    /** Cycles the input mode on an external TV. */
    TVInput: "TVInput",

    /** Locks or unlocks the currently selected content or pgoram. */

    /** The device's power button. */
    TVPower: "TVPower",

    /** Timer programming button. */
    TVTimer: "TVTimer",

    /** The Zenkaku (full width) characters key. */
    Zenkaku: "Zenkaku",

    /** The ZoomOut key. */
    ZoomOut: "ZoomOut",

    /**
     * The Accept, Commit,
     * or OK key or button. Accepts the currently selected option or input method sequence conversion.
     */
    Accept: "Accept",

    /** The Camera key. Activates the camera. */
    Camera: "Camera",

    /** The Cancel key. */
    Cancel: "Cancel",

    /** The Delete key, Del. */
    Delete: "Delete",

    /**
     * Adjusts the brightness of the device by toggling between two brightness
     * levels or by cycling among multiple brightness levels.
     */
    Dimmer: "Dimmer",

    /** The numeric keypad's division key, /. */
    Divide: "Divide",

    /**
     * The Esc (Escape) key. Typically used as an exit, cancel, or "escape this operation" button.
     * Historically, the Escape character was used to signal
     * the start of a special control sequence of characters called an "escape sequence."
     */
    Escape: "Escape",

    /** The Finish key. */
    Finish: "Finish",

    /**
     * The FnLock or F-Lock (Function Lock) key.Toggles the function key mode described by "Fn" on and off.
     * Often handled in hardware so that events aren't generated for this key.
     */
    FnLock: "FnLock",

    /** The Back button. */
    GoBack: "GoBack",

    /** The Home button. Returns the user to the phone's main screen (usually an application launcher). */
    GoHome: "GoHome",

    /** The Insert key, Ins. Toggles between inserting and overwriting text. */
    Insert: "Insert",

    /** The LogOff key. */
    LogOff: "LogOff",

    /** The Page Up (or PgUp) key. Scrolls up or displays the previous page of content. */
    PageUp: "PageUp",

    /** A button to move the picture-in-picture view upward. */
    PinPUp: "PinPUp",

    /** The Romaji key; selects the Roman character set. */
    Romaji: "Romaji",

    /** The Select key. */
    Select: "Select",

    Symbol: "Symbol",

    /** The WakeUp key. Used to wake the computer from the hibernation or standby modes. */
    WakeUp: "WakeUp",

    /** The ZoomIn key. */
    ZoomIn: "ZoomIn",

    /** The Again key. Redoes or repeats a previous action. */
    Again: "Again",

    /** The Clear key. Removes the currently selected input. */
    Clear: "Clear",

    /** Closes the current document or message. Must not exit the application. */
    Close: "Close",

    /** The Cursor Select key, CrSel. */
    CrSel: "CrSel",

    /** The Eject key. Ejects removable media (or toggles an optical storage device tray open and closed). */
    Eject: "Eject",

    /** The Enter or ↵ key (sometimes labeled Return). */
    Enter: "Enter",

    /** The ExSel (Extend Selection) key. */
    ExSel: "ExSel",

    /** Toggles the display of the program or content guide. */
    Guide: "Guide",

    /** The Hyper key. */
    Hyper: "Hyper",

    /** The 11 key found on certain media numeric keypads. */
    Key11: "Key11",

    /** The 12 key found on certain media numeric keypads. */
    Key12: "Key12",

    /** Paste from the clipboard. */
    Paste: "Paste",

    /**
     * The Pause key. Pauses the current application or state, if applicable.
     * Note: This shouldn't be confused with the "MediaPause" key value, which is used for media controllers,
     * rather than to control applications and processes.
     */
    Pause: "Pause",

    /**
     * The Power button or key, to toggle power on and off.
     * Note: Not all systems pass this key through to the user agent.
     */
    Power: "Power",

    /** Prints the current document or message. */
    Print: "Print",

    /** The Props (Properties) key. */
    Props: "Props",

    /**
     * The Shift key. Modifies keystrokes to allow typing upper (or other) case letters,
     * and to support typing punctuation and other special characters.
     */
    Shift: "Shift",

    /** The first general-purpose virtual function key. */
    Soft1: "Soft1",

    /** The second general-purpose virtual function key. */
    Soft2: "Soft2",

    /** The third general-purpose virtual function key. */
    Soft3: "Soft3",

    /** The fourth general-purpose virtual function key. */
    Soft4: "Soft4",

    /** The Super key. */
    Super: "Super",

    /** The Attn (Attention) key. */
    Attn: "Attn",

    /** The Call key. Dials the number which has been entered. */
    Call: "Call",

    /** The Copy key (on certain extended keyboards). */
    Copy: "Copy",

    /**
     *  A dead "combining" key; that is,
     *  a key which is used in tandem with other keys to generate accented and other modified characters.
     *  If pressed by itself, it doesn't generate a character.
     *  If you wish to identify which specific dead key was pressed (in cases where more than one exists),
     *  you can do so by examining the KeyboardEvent's associated compositionupdate event's data property.
     */
    Dead: "Dead",

    /** The Eisu key. This key's purpose is defined by the IME, but may be used to close the IME. */
    Eisu: "Eisu",

    /** The Exit button, which exits the curreent application or menu. */
    Exit: "Exit",

    /** The Find key. Opens an interface (typically a dialog box) for performing a find/search operation. */
    Find: "Find",

    /** The Help key. Opens or toggles the display of help information. */
    Help: "Help",

    /** The Home key. Moves to the start of content. */
    Home: "Home",

    /** Toggles the display of information about the currently selected content, program, or media. */
    Info: "Info",

    /** Opens content liniked to the current program, if available and possible. */
    Link: "Link",

    Lock: "Lock",

    /**
     * The Meta key. Allows issuing special command inputs.
     * This is the Windows logo key, or the Command or ⌘ key on Mac keyboards.
     */
    Meta: "Meta",

    /** Opens an existing document or message. */
    Open: "Open",

    /**
     * The Play key. Resumes a previously paused application, if applicable.
     * Note: This shouldn't be confused with the "MediaPlay" key value, which is used for media controllers,
     * rather than to control applications and processes.
     */
    Play: "Play",

    /** Redo the last action. */
    Redo: "Redo",

    /** Saves the current document or message. */
    Save: "Save",

    /** Undo the last action. */
    Undo: "Undo",

    /**
     * Causes the device to identify itself in some fashion, such as by flashing a light,
     * briefly changing the brightness of indicator lights, or emitting a tone.
     */
    Wink: "Wink",

    /** The numeric keypad's addition key, +. */
    Add: "Add",

    Alt: "Alt",

    /** The Cut key (on certain extended keyboards). */
    Cut: "Cut",

    /** Switches the input source to the Digital Video Recorder (DVR). */
    DVR: "DVR",

    /** The End key. Moves to the end of content. */
    End: "End",

    /** The F10 key. */
    F10: "F10",

    /** The F11 key. */
    F11: "F11",

    /** The F12 key. */
    F12: "F12",

    /** The F13 key. */
    F13: "F13",

    /** The F14 key. */
    F14: "F14",

    /** The F15 key. */
    F15: "F15",

    /** The F16 key. */
    F16: "F16",

    /** The F17 key. */
    F17: "F17",

    /** The F18 key. */
    F18: "F18",

    /** The F19 key. */
    F19: "F19",

    /** The F20 key. */
    F20: "F20",

    /** Creates a new document or message. */
    New: "New",

    /** The Horizontal Tab key, Tab. */
    Tab: "Tab",

    /** The first general-purpose function key, F1. */
    F1: "F1",

    /** The F2 key. */
    F2: "F2",

    /** The F3 key. */
    F3: "F3",

    /** The F4 key. */
    F4: "F4",

    /** The F5 key. */
    F5: "F5",

    /** The F6 key. */
    F6: "F6",

    /** The F7 key. */
    F7: "F7",

    /** The F8 key. */
    F8: "F8",

    /** The F9 key. */
    F9: "F9",

    /**
     * The Fn (Function modifier) key. Used to allow generating function key (F1–F15, for instance)
     * characters on keyboards without a dedicated function key area. Often handled in hardware
     * so that events aren't generated for this key.
     */
    Fn: "Fn",

    /** Switches into TV viewing mode. */
    TV: "TV",
} as const;
