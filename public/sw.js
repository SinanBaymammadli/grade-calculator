/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror-client.html","01bbd03af24419d9dd2eeb03028740a5"],["/bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror-worker.js","a7e73ff0a64b112bd3cde266f193ad98"],["/bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror.html","c31d05e921122abac64aba891eb79f8a"],["/bower_components/app-storage/app-indexeddb-mirror/common-worker-scope.js","ee3751715397236b8b6a9351bcb42b34"],["/bower_components/app-storage/app-indexeddb-mirror/common-worker.html","742a4f9830606c5000bc5f7c79d48a35"],["/bower_components/app-storage/app-localstorage/app-localstorage-document.html","30c2fc7a4269193b288fb08755b79c6d"],["/bower_components/app-storage/app-network-status-behavior.html","65110b80564b08b397ea71bb24090c11"],["/bower_components/app-storage/app-storage-behavior.html","d6674a8c280be213f2d897a99b5a11a7"],["/bower_components/app-storage/index.html","98c2068939cd33f62d3e71f2ecaacde2"],["/bower_components/app-storage/test/app-indexeddb-mirror/app-indexeddb-mirror.html","11c1b384159c38e7107685b1057ccbec"],["/bower_components/app-storage/test/app-indexeddb-mirror/helpers.js","c4b32d9099f07f924d37d1a68a3f5090"],["/bower_components/app-storage/test/app-localstorage/app-localstorage-document.html","232ed37aa2822e3da86df7531a745d4c"],["/bower_components/app-storage/test/app-storage-compatibility-suite.html","b3813c990bf38f171f096a9840ddb3fa"],["/bower_components/app-storage/test/app-storage.html","3a244a57bf8b79575afcce96aacd9a10"],["/bower_components/app-storage/test/index.html","9d873f0e1525aef894540ceb9e12097d"],["/bower_components/firebase/firebase-app-externs.js","f28952a9c2db6c3197ae21983d87090f"],["/bower_components/firebase/firebase-app.js","e9dc55e3a2c98340977069113ea78860"],["/bower_components/firebase/firebase-auth-externs.js","98e48322d41a94c5d8f562fade96cc5b"],["/bower_components/firebase/firebase-auth.js","94599050fb431022c667404065c605ac"],["/bower_components/firebase/firebase-database-externs.js","68fc32b3887eb6bd22848d8e87ebbd81"],["/bower_components/firebase/firebase-database.js","72d629712c77d0d97a079ff1c46d4713"],["/bower_components/firebase/firebase-messaging-externs.js","fdb6d1a28dda5b17e83c834b8b6645f4"],["/bower_components/firebase/firebase-messaging.js","11ef205890cbc3f2ba341220613d9ab9"],["/bower_components/firebase/firebase-storage-externs.js","dd2c9291524c5f4b1b672eda7862908b"],["/bower_components/firebase/firebase-storage.js","ef8f7d6ab83d1877d55138e01248afdc"],["/bower_components/firebase/firebase.js","70325e8c700eec7e2787b76100ae0c6e"],["/bower_components/font-roboto/roboto.html","3c017dcd17189b99a03dbeffb81bc254"],["/bower_components/iron-a11y-announcer/demo/index.html","1c372437e3f6d385507439da68fca439"],["/bower_components/iron-a11y-announcer/demo/x-announces.html","26f897f8356ca71fccdb45a1ee8904ea"],["/bower_components/iron-a11y-announcer/index.html","88776a7513529faf429eebdb9fd7e716"],["/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","a7481abe4e739db811c2f50a50c0af3a"],["/bower_components/iron-a11y-announcer/test/index.html","56e5be5e43ec714058e0944bbe5fbd4f"],["/bower_components/iron-a11y-announcer/test/iron-a11y-announcer.html","d41ea17676468c35625a0338e64cf2c9"],["/bower_components/iron-a11y-keys-behavior/demo/index.html","1ce1854e9de7a43eb739e2ce78853c0f"],["/bower_components/iron-a11y-keys-behavior/demo/x-key-aware.html","777c7185ce8390f8c0141bf4d3916e4c"],["/bower_components/iron-a11y-keys-behavior/index.html","f8e16b2a3282b3da28213336695b54ea"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","54c4fb4e39478fc1b6d09b4acbd0389a"],["/bower_components/iron-a11y-keys-behavior/test/basic-test.html","28532a8f06b0c4408424c24d45392562"],["/bower_components/iron-a11y-keys-behavior/test/index.html","6705a3ea09c958ae2f85ee34d9965518"],["/bower_components/iron-autogrow-textarea/demo/index.html","1939a4b4a77f0df851962ceb7f93869f"],["/bower_components/iron-autogrow-textarea/index.html","516eb6756f60fa54f103881b3a0a7055"],["/bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","6134b66684578bc02e9d4d8e60047481"],["/bower_components/iron-autogrow-textarea/test/basic.html","3b7321c7ba35a175c2da89e3b61939e1"],["/bower_components/iron-autogrow-textarea/test/index.html","caba5fad77eeb59483f45c301c17653d"],["/bower_components/iron-behaviors/demo/index.html","50b686272f914fdba14a1bd48f88edab"],["/bower_components/iron-behaviors/demo/simple-button.html","be199e3b39cd3c6d29ac5bb3152dc5e6"],["/bower_components/iron-behaviors/index.html","224d488d9de603f8a42e9eba8457cffa"],["/bower_components/iron-behaviors/iron-button-state.html","75da1ac0ca8d191caa798a65ec5a4c8b"],["/bower_components/iron-behaviors/iron-control-state.html","c05daf791e449749c5268bd95ec626aa"],["/bower_components/iron-behaviors/test/active-state.html","180f6b194654f83c40aa4779f8551574"],["/bower_components/iron-behaviors/test/disabled-state.html","6eff753429983058871fa4bb34a82395"],["/bower_components/iron-behaviors/test/focused-state.html","2b06bd9b51703fd61cbbe70afcfab848"],["/bower_components/iron-behaviors/test/index.html","e96eaf1204b28df91964c64d4f4d669c"],["/bower_components/iron-behaviors/test/test-elements.html","c94b1c7668dd38d51daeb948c982d9ab"],["/bower_components/iron-checked-element-behavior/demo/index.html","713379cbccca81d7aa8792a019598e87"],["/bower_components/iron-checked-element-behavior/demo/simple-checkbox.html","6f89c2c5a2cf2e8327380b6fcb906e6c"],["/bower_components/iron-checked-element-behavior/index.html","610778b47d072c4783f599220c046b29"],["/bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","42c03c616d99e540b9ca824154d02d89"],["/bower_components/iron-checked-element-behavior/test/basic.html","b016cac4b1d65007905452517e66d6b1"],["/bower_components/iron-checked-element-behavior/test/index.html","ee22366c0264850229bee3b53309ffb3"],["/bower_components/iron-checked-element-behavior/test/simple-checkbox.html","883d99528dd4d44ece5d869503dc9b0e"],["/bower_components/iron-flex-layout/classes/iron-flex-layout.html","533766b209c5e3d1957117204c312241"],["/bower_components/iron-flex-layout/classes/iron-shadow-flex-layout.html","c880e8f5354c298f0404530ab0cff0d9"],["/bower_components/iron-flex-layout/demo/index.html","882df91034e93a809e2e01c2027414cb"],["/bower_components/iron-flex-layout/index.html","196e49064318640b296a576da99dc554"],["/bower_components/iron-flex-layout/iron-flex-layout-classes.html","656314ffe981830043fe89b918e20371"],["/bower_components/iron-flex-layout/iron-flex-layout.html","151308b528090fb6c76b74d8943aa0b0"],["/bower_components/iron-flex-layout/test/index.html","8a2bd37e8a6b7dd3649282b41cc94197"],["/bower_components/iron-flex-layout/test/iron-flex-layout-classes.html","49e84a4e738ea1b7ec0ffd8bac71cd4b"],["/bower_components/iron-flex-layout/test/iron-flex-layout.html","a862da5e10e4b98093e6639ebb96fde3"],["/bower_components/iron-form-element-behavior/demo/index.html","1d904c65ac632daeed43e7d1c04a676b"],["/bower_components/iron-form-element-behavior/demo/simple-element.html","7e26743b5a10eb2864bbf41510027ab4"],["/bower_components/iron-form-element-behavior/demo/simple-form.html","1816335d3a15b96690dc98ff9294ea3b"],["/bower_components/iron-form-element-behavior/index.html","af04489de5b0e8c97e460f662f1ceee4"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","8ffdd1ce0a492d317776bb1bb4a443a0"],["/bower_components/iron-form-element-behavior/test/basic.html","8169ea520f059d53bd16817f033064c3"],["/bower_components/iron-form-element-behavior/test/index.html","810bc13af626f3bd68007f568b0679c9"],["/bower_components/iron-form-element-behavior/test/simple-element.html","4257780a78b4fbe0e445646c59f6d462"],["/bower_components/iron-form-element-behavior/test/simple-form.html","186a8eba928c7aeb0ae9d3c12d34777f"],["/bower_components/iron-image/demo/index.html","56ea850eb8464de621276cc665df7a66"],["/bower_components/iron-image/demo/loading.png","096601be4c5e4ef2ea285d9932197ded"],["/bower_components/iron-image/index.html","a692d9da06eaaf4179ecd6f7705d039d"],["/bower_components/iron-image/iron-image.html","768e2931f28395e8445cdd0add3c7147"],["/bower_components/iron-image/test/index.html","490b0261709f7b1dd1e4dcf07938b4fe"],["/bower_components/iron-image/test/iron-image.html","ce39cf3bd2bb3330e020178b26ded59c"],["/bower_components/iron-input/demo/index.html","b3e0e362d8199e495bb3a46d1367d0dd"],["/bower_components/iron-input/index.html","53c06c55498dd515ef364a1c41a0ae9b"],["/bower_components/iron-input/iron-input.html","c9258caa5be1130df21efa8963b8bec2"],["/bower_components/iron-input/test/disabled-input.html","709ebfb0b14fda9e2c39c71f4c9448c9"],["/bower_components/iron-input/test/index.html","d71f2d0a4b80eed6298f21921149ebd9"],["/bower_components/iron-input/test/iron-input.html","1c949b0f7a932cc6a306e97d6b9f3d27"],["/bower_components/iron-input/test/letters-only.html","1dd0b9001e2d67a605f5f3f02075c944"],["/bower_components/iron-meta/demo/index.html","e4c1331cbc9585198416d074585dc6c4"],["/bower_components/iron-meta/index.html","a6fc19e4a98626c80aeaf253c7c04624"],["/bower_components/iron-meta/iron-meta.html","7c6822b1fb9f3b07ca501087b0feda2f"],["/bower_components/iron-meta/test/basic.html","6bb0a9ba1e4f1170badd6c77882f7fd5"],["/bower_components/iron-meta/test/index.html","a51796104718d6313ea16d2f8cc5bab5"],["/bower_components/iron-meta/test/iron-meta.html","3cd8fc35a8c2a4e0b08c88300076298f"],["/bower_components/iron-validatable-behavior/demo/cats-only.html","e626c89c736addb7dbffda3873b1e415"],["/bower_components/iron-validatable-behavior/demo/index.html","811027ad482129ce80646b30efe8d10e"],["/bower_components/iron-validatable-behavior/demo/validatable-input.html","f113ca6f1710c1c000575d8a155c80b6"],["/bower_components/iron-validatable-behavior/index.html","230e2151859e88473e6cdb8fb186b107"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","7ab1d3a5f460d0e87c3aa9fb4fcdfe00"],["/bower_components/iron-validatable-behavior/test/cats-only.html","320fcb41e5081b89c584ef9d56a256dc"],["/bower_components/iron-validatable-behavior/test/dogs-only.html","1aca6a2eb016bf2c325ab9ba23473730"],["/bower_components/iron-validatable-behavior/test/index.html","22074ee13b08afe2898321fab4d6e34b"],["/bower_components/iron-validatable-behavior/test/iron-validatable-behavior.html","a56d1c293dd113e82c7e080aa6c5cb57"],["/bower_components/iron-validatable-behavior/test/test-validatable.html","43a61e08482031059b62a158a1243dbd"],["/bower_components/paper-behaviors/demo/index.html","8238a080d84ca4bd93b7fdcc6613edd2"],["/bower_components/paper-behaviors/demo/paper-button.html","87d953007dd14045ad23efdd6f61943f"],["/bower_components/paper-behaviors/demo/paper-radio-button.html","fd6ca54c3143b0073ccca75775f539bc"],["/bower_components/paper-behaviors/index.html","5f6135dc7ff835d11275c61a5e8d0655"],["/bower_components/paper-behaviors/paper-button-behavior.html","53c543a5496d4ccaaddc58a7a151f5c3"],["/bower_components/paper-behaviors/paper-checked-element-behavior.html","5e33a457606b1ac9703f9fd39ae49fdc"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","577571a2641bd627cb10df0d87330441"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","eb03adf1fddd6f8e71cfc12af8f8d3ba"],["/bower_components/paper-behaviors/test/index.html","267b97c54efe0094411fdb7132463f4a"],["/bower_components/paper-behaviors/test/paper-button-behavior.html","236d348b085f6d98daa3c7ddd08592d7"],["/bower_components/paper-behaviors/test/paper-checked-element-behavior.html","586673494c5e3f69427bf352df4b04db"],["/bower_components/paper-behaviors/test/paper-radio-button-behavior.html","dc8ce918e2b64603741e84998cc2a0c9"],["/bower_components/paper-behaviors/test/paper-ripple-behavior.html","9873c710315930f74c0df015096891ab"],["/bower_components/paper-behaviors/test/shadowed-ripple.html","76bcdda81c2e6905477e11b42ae22202"],["/bower_components/paper-behaviors/test/test-button.html","d5f13ebcc1d241f3c29cf95b0720d01e"],["/bower_components/paper-behaviors/test/test-radio-button.html","a7ae223b0a271ee450ec091bae2d43d8"],["/bower_components/paper-button/demo/index.html","6fb91a613589ef53fdd5168ef88ed1d7"],["/bower_components/paper-button/index.html","05d0abe0ed8dad3699359b4102400b21"],["/bower_components/paper-button/paper-button.html","1d481dc2b55f2e2fdd7a31fcd20a87f0"],["/bower_components/paper-button/test/index.html","da45c80657f199ebea7dabfe5c770375"],["/bower_components/paper-button/test/paper-button.html","f63779cc07eac43f4ae4ef75a5afa759"],["/bower_components/paper-card/demo/cafe.png","c0ef70264498b188c59be1986115858c"],["/bower_components/paper-card/demo/donuts.png","44ccb82cbafa1c3aa3ebbdaae53d839d"],["/bower_components/paper-card/demo/house.png","d0245d89857f0c4c3040ec8fac65fb7d"],["/bower_components/paper-card/demo/index.html","1d5a4846dd4cea403976d6b034ba737b"],["/bower_components/paper-card/demo/travel.png","aaa0f1006ec0e2e84e9fc0c11834b58e"],["/bower_components/paper-card/demo/trip.png","90d1c7348046a538f72b32720d627111"],["/bower_components/paper-card/index.html","2ae5e0cc2eb406591a4abd66d01ddaec"],["/bower_components/paper-card/paper-card.html","a48ed936a0c19856104fd8baf256ee43"],["/bower_components/paper-card/test/basic.html","ba3c9279c8403a363ce09eccdb7717e6"],["/bower_components/paper-card/test/index.html","f15f84d8e4987df93d7540bf6b2931f1"],["/bower_components/paper-header-panel/demo/index.html","9bc4316ea42a8eef6f0900a0be518b68"],["/bower_components/paper-header-panel/index.html","62daee4bc3870ef416e304cfc38b15e4"],["/bower_components/paper-header-panel/paper-header-panel.html","c444f3d7600746e6599c27fc1027e99f"],["/bower_components/paper-header-panel/test/basic.html","a6d62bb06e4933575691c2a9ddc1ba55"],["/bower_components/paper-header-panel/test/index.html","42412e4d158ef7f5fc6e9198c2c12227"],["/bower_components/paper-input/all-imports.html","9163c20ddfd457e2918b9a752097c152"],["/bower_components/paper-input/demo/index.html","bb41d46cf0fea0a004b98c0c4e5e22cb"],["/bower_components/paper-input/demo/ssn-input.html","de150dd0c56294021af8b80ce38e4c8f"],["/bower_components/paper-input/demo/ssn-validator.html","fbbc4fad2d2b4394950b1d1e26940662"],["/bower_components/paper-input/index.html","5a4ea8b440283bbeb5820070a537999d"],["/bower_components/paper-input/paper-input-addon-behavior.html","92fe877f9231f09bcde5b2298dc0536c"],["/bower_components/paper-input/paper-input-behavior.html","a08bc3bd30d52e1583e158dad185cbd1"],["/bower_components/paper-input/paper-input-char-counter.html","0e7fabfb78a0740fb3887dff8b032496"],["/bower_components/paper-input/paper-input-container.html","675ae9dc2b2d1aaacb0cd02fc161795e"],["/bower_components/paper-input/paper-input-error.html","47e38ab875f7bf6ca03648842f99d10d"],["/bower_components/paper-input/paper-input.html","d714836b0a66495e625dc9050833c324"],["/bower_components/paper-input/paper-textarea.html","d505ed5b41fa30e971f20c12760e6f26"],["/bower_components/paper-input/test/index.html","f755e839c3e921199bd6c426082e0ac9"],["/bower_components/paper-input/test/letters-only.html","1dd0b9001e2d67a605f5f3f02075c944"],["/bower_components/paper-input/test/paper-input-char-counter.html","3ff01efaebcbe9fd8894289b357eab88"],["/bower_components/paper-input/test/paper-input-container.html","73565a9a197157ef51b6a5cde2f8216c"],["/bower_components/paper-input/test/paper-input-error.html","fed46721cfb1f450095664128e05cf1d"],["/bower_components/paper-input/test/paper-input.html","7ea8e1aca23a64195e9b40820561c3c1"],["/bower_components/paper-input/test/paper-textarea.html","3e3516bf1c85a18eeef9688fd8c6ea77"],["/bower_components/paper-material/demo/index.html","da9bbf7b7844f956b26f6d2fdc97461e"],["/bower_components/paper-material/index.html","c1590824b451030e91c20376c5af0f47"],["/bower_components/paper-material/paper-material-shared-styles.html","69c1aafd30b9710e1f852fd677907bf8"],["/bower_components/paper-material/paper-material.html","3c53783a2f03a21a4e56ff2548a841dd"],["/bower_components/paper-material/test/index.html","3401efcc01720f9177bde8f4851f1f10"],["/bower_components/paper-material/test/paper-material.html","2016eb6c862e1513598102055673e60f"],["/bower_components/paper-ripple/demo/index.html","38d139805e215ba20838108e2e7d8101"],["/bower_components/paper-ripple/index.html","1e14ddb92529ac8c6482c555b8dc6a6f"],["/bower_components/paper-ripple/paper-ripple.html","fec422b0e1275430809da68cc7c95fc5"],["/bower_components/paper-ripple/test/index.html","219d3e288e77abb5e34726432f3d648f"],["/bower_components/paper-ripple/test/paper-ripple.html","1e0ce29a68744d05ddb4b41617baacb0"],["/bower_components/paper-styles/classes/global.html","93fdfcdc19f0ec3c0625c3e62fa4481d"],["/bower_components/paper-styles/classes/shadow-layout.html","11daaf557b0a7bb2bf2fc90f3f7f9aaf"],["/bower_components/paper-styles/classes/shadow.html","a231a73a8f7ee570839111670f11a45d"],["/bower_components/paper-styles/classes/typography.html","5561d2b140e84091f56ca8e50014e624"],["/bower_components/paper-styles/color.html","c416d52e3dddcb9259e7ffa65c829bcf"],["/bower_components/paper-styles/default-theme.html","4c77bbaac8b5b7f92e93286609a5debd"],["/bower_components/paper-styles/demo-pages.html","579e044c549f136283213044069c4181"],["/bower_components/paper-styles/demo.css","a6afbbe17d5350a006d50bc1ac0bd59e"],["/bower_components/paper-styles/demo/index.html","29012ce337653e7417508785d9511834"],["/bower_components/paper-styles/index.html","667b76ca73c2a70105443a2151c49b7e"],["/bower_components/paper-styles/paper-styles-classes.html","152826dd4271452e7f557b5133a83b95"],["/bower_components/paper-styles/paper-styles.html","116f49145f929f7317e9ab63b5e8f8bd"],["/bower_components/paper-styles/shadow.html","2d664cdbcf148ced8806d53f7679b3a4"],["/bower_components/paper-styles/typography.html","1e421eceab74be3206d130933c0768fb"],["/bower_components/polymer/polymer-micro.html","363623d9ab9ade5eb67cc264b5e2ee8c"],["/bower_components/polymer/polymer-mini.html","85fb24027a48ee5f998a4d27eb50e15b"],["/bower_components/polymer/polymer.html","d2c5ff282c9ba6b41188064390fb6868"],["/bower_components/polymerfire/demo/firebase-auth.html","afdb882dd0e8d8fb5c8d1d6ddfc54838"],["/bower_components/polymerfire/demo/firebase-messaging-sw.js","a0f2233c1dc220e91bd6d2ab4c72787d"],["/bower_components/polymerfire/demo/firebase-messaging.html","dcbb38cf1784b6375e742aa8793531c9"],["/bower_components/polymerfire/demo/index.html","66c7ffec14350842b2403f4a06aa5ef4"],["/bower_components/polymerfire/demo/note-app.html","c58c6204418677585b93792cb644808f"],["/bower_components/polymerfire/firebase-app-script.html","4974816369ad626b6643fd448a718b5b"],["/bower_components/polymerfire/firebase-app.html","1fbebe6868a8d423c550b0c54922ee38"],["/bower_components/polymerfire/firebase-auth-script.html","05d2aea8de7dc56f27582195aad8746c"],["/bower_components/polymerfire/firebase-auth.html","6b697d7db3bf9de3fe229f82425cce6f"],["/bower_components/polymerfire/firebase-common-behavior.html","3ddb425d05905a9312ad25fdb34a1fd4"],["/bower_components/polymerfire/firebase-database-behavior.html","0b449065d41b8dd14d0e40aaa8a46e02"],["/bower_components/polymerfire/firebase-database-script.html","cef0dc8b12eaeb8f1b32a239d40086ea"],["/bower_components/polymerfire/firebase-document.html","e0835f9def209be05bdbb7483825d17b"],["/bower_components/polymerfire/firebase-messaging-script.html","cf01ea25976351c84587301d4d0b1c17"],["/bower_components/polymerfire/firebase-messaging.html","4924df3b3fee0c9245718ef37da58596"],["/bower_components/polymerfire/firebase-query.html","2b07e03d97701df60fc65483f1f8a1a7"],["/bower_components/polymerfire/firebase-storage-script.html","b12dc3fbb063cad566e9f5ef2f72d06f"],["/bower_components/polymerfire/firebase.html","f7cdaaf557d2bc3715a6d59b2952c362"],["/bower_components/polymerfire/index.html","7518fcc2069457fffc2e84cb0559c8c4"],["/bower_components/polymerfire/polymerfire.html","8b1fd81cddbd5654aef2b9a3ea959ef0"],["/bower_components/promise-polyfill/Gruntfile.js","fb7a42e762b30d77211459fe6a2999b9"],["/bower_components/promise-polyfill/Promise-Statics.js","02005242df61471f6758e0d133a9acc7"],["/bower_components/promise-polyfill/Promise.js","6d72e76387d06f828797b0ce05a2feb7"],["/bower_components/promise-polyfill/Promise.min.js","ee760d0ffb6812135d81e678f4a190d2"],["/bower_components/promise-polyfill/promise-polyfill-lite.html","965c7e4a3b59ae6da112c36ef7fcaeb6"],["/bower_components/promise-polyfill/promise-polyfill.html","feed1daf4d696057f175ccb535ffd53d"],["/bower_components/webcomponentsjs/CustomElements.js","f977e980eaa6b4c4160e6dd3e3805cbc"],["/bower_components/webcomponentsjs/CustomElements.min.js","c3aa97d583aadfcc966430c46769c7f6"],["/bower_components/webcomponentsjs/HTMLImports.js","c3af5f5898ba545d6c505bbab51c039d"],["/bower_components/webcomponentsjs/HTMLImports.min.js","f8555c4cccf7800d1c77fc574b89e734"],["/bower_components/webcomponentsjs/MutationObserver.js","5e3045487002d63464d23c4b88210d9a"],["/bower_components/webcomponentsjs/MutationObserver.min.js","8d37affadb36a8194139be037e1860f0"],["/bower_components/webcomponentsjs/ShadowDOM.js","8428373bda9fbd83651d4556ecca035b"],["/bower_components/webcomponentsjs/ShadowDOM.min.js","cbe5e7b8b5cdd30662936d91290a0768"],["/bower_components/webcomponentsjs/webcomponents-lite.js","7da0c33a6f82869081795cf111392359"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","89313f9f2126ddea722150f8154aca03"],["/bower_components/webcomponentsjs/webcomponents.js","e1967ae43d17ddbd27606174d3e0c8fb"],["/bower_components/webcomponentsjs/webcomponents.min.js","05db95b5e26fb6cf77d3043eaa1e06de"],["/grade-calculator.html","7d22100842f941f406ce3086ca5e0c14"],["/images/icons/icon-128x128.png","b58a92d84cf93d4595e6840a07bcff47"],["/images/icons/icon-144x144.png","6471cf36666afe52eac45369af51dc72"],["/images/icons/icon-152x152.png","7a3adb8dec0021737a60e3720d72077f"],["/images/icons/icon-192x192.png","6dc024f0fc400ca80bc8f1c873b785ae"],["/images/icons/icon-384x384.png","5fb49f2ab76b8f5b8e39aa5d0ef2bfde"],["/images/icons/icon-512x512.png","5721e8616a25a60d64c24c060e7731ac"],["/images/icons/icon-72x72.png","c3fec5cbf7906dafdb109f1498308b4a"],["/images/icons/icon-96x96.png","0a5c2221f43417cb9d84986755751e01"],["/index.html","43c0a603a1e1f5800e3d70b4ab256c20"],["/my-app.html","3bbf6a9f97727036e2911d6572ec2623"],["/my-login.html","b0fa75c9aec6c8c4d3c803e0e7ab6e5e"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||d.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||d.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||d.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||d.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);l=l?l.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),d.preCacheItems=d.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var l,d=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: cache first ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e).then(function(t){return t?t:o.fetchAndCache(e,n)})})}var o=e("../helpers");t.exports=r},{"../helpers":1}],8:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: cache only ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e)})}var o=e("../helpers");t.exports=r},{"../helpers":1}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var o,s,a=[];if(c){var u=new Promise(function(n){o=setTimeout(function(){t.match(e).then(function(e){e&&n(e)})},1e3*c)});a.push(u)}var f=i.fetchAndCache(e,n).then(function(e){if(o&&clearTimeout(o),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),s=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(s)return s;throw r})});return a.push(f),Promise.race(a)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e){for(var t,n=[],r=0,o=0,i="";null!=(t=x.exec(e));){var c=t[0],s=t[1],a=t.index;if(i+=e.slice(o,a),o=a+c.length,s)i+=s[1];else{var f=e[o],h=t[2],p=t[3],l=t[4],d=t[5],g=t[6],m=t[7];i&&(n.push(i),i="");var v=null!=h&&null!=f&&f!==h,w="+"===g||"*"===g,y="?"===g||"*"===g,b=t[2]||"/",E=l||d||(m?".*":"[^"+b+"]+?");n.push({name:p||r++,prefix:h||"",delimiter:b,optional:y,repeat:w,partial:v,asterisk:!!m,pattern:u(E)})}}return o<e.length&&(i+=e.substr(o)),i&&n.push(i),n}function o(e){return s(r(e))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(m(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){for(var o=r(e),i=g(o,n),c=0;c<o.length;c++)"string"!=typeof o[c]&&t.push(o[c]);return f(i,t)}function g(e,t){t=t||{};for(var n=t.strict,r=t.end!==!1,o="",i=e[e.length-1],c="string"==typeof i&&/\/$/.test(i),s=0;s<e.length;s++){var u=e[s];if("string"==typeof u)o+=a(u);else{var f=a(u.prefix),p="(?:"+u.pattern+")";u.repeat&&(p+="(?:"+f+p+")*"),p=u.optional?u.partial?f+"("+p+")?":"(?:"+f+"("+p+"))?":f+"("+p+")",o+=p}}return n||(o=(c?o.slice(0,-2):o)+"(?:\\/(?=$))?"),o+=r?"$":n&&c?"":"(?=\\/|$)",new RegExp("^"+o,h(t))}function m(e,t,n){return t=t||[],v(t)?n||(n={}):(n=t,t=[]),e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=m,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=g;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/^https:\/\/fonts\.googleapis\.com\//, toolbox.cacheFirst, {});
toolbox.router.get(/^https:\/\/www\.google-analytics\.com\//, toolbox.cacheFirst, {});
toolbox.router.get(/^https:\/\/fonts\.gstatic\.com\//, toolbox.cacheFirst, {});




