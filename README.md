[109-1] Web Programming Final
------------------------------------------------------------------------------------
(Group 52) 台大供需大平台
 
Deployed: http://webprogramming.final.geniuspudding.blog/
 
Demo: (待補)
 
描述: 
這個服務在幫助校園內的各位，最即時的串聯任何形式的需求與供給，並自行決定回報的報酬，包含但不限於食衣住行育樂。試圖提出一個能夠降低傳統使用FB版面來進行買賣或是供需媒合麻煩度的平台模式，主要想改進的是類似FB"出清台大"版的貼文混亂且功能並非那麼直接符合媒合需求的問題
 
使用/操作方式:
1. 以台大學號註冊，登入
2. 首頁左右滑動去瀏覽線上所有的需求單圖片列表，類似於瀏覽IG動態的人性使用方式，並可以自行決定是否點擊接單
3. 搜尋頁面提供各種不同的分類與清單列表，提供更快速瀏覽需求的頁面
4. 個人頁面可以設置個人資訊、瀏覽自己所刊登的所有需求單，以及自己接下的需求單
5. 點擊每張需求單可以看到詳情，包含圖片與詳細內容，以及供各用戶交流留言的留言板
 
Github link: https://github.com/GeniusPudding/WebPorgrammingFinal
 
其他說明:
 
使用與參考之框架/模組/原始碼:  
使用了登入台大服務的css與圖片，並參考了實習公司的前端專案架構分割與前面幾次作業的api寫法
 
專題製作心得:
這次從構想階段就思索了一個很大的題目，主要發想的目的是想解決大家生活上遇到的大小問題，以及FB台大交流版與出清台大版的亂象，試圖設計一個使用流程更明確且更方便解決問題的校園供需平台。
當然在開始實作的過程中遇到很多技術上的困難，除了整個專案的架構之外，對於技術細節我們都仍經驗不足，以至於常常遇到許多實作上不明白怎麼寫的困境，也發現很多整學期學到的東西其實都一知半解，後來在期末重新評估了時間與能力之後，敲定了一個極簡的版本藍圖來作為最後展示，雖然架構極其簡單但至少是能夠運作其核心功能的。 
在這段過程中，我們對於前後端的開發都有些初步的掌握，也終於能體會到如何將前後端與DB串接起來，做出一個完整的網路服務，也將整學期學到的東西盡皆再次熟悉，而這樣的實戰經驗也是上這門課最大的收穫之一。
這個題目一開始也構思了很多發展方向，日後可做為我們未來的延伸，例如；合約成交後的驗證與回饋機制、VIP用戶與獎懲機制、server端對於需求單的管理分類排序給前端使用、連結校園地圖並即時產生需求信號、做成專門的App讓使用上更為即時便利、新增一些付費廣告功能、與學校其它電子與實體服務的串接等等。 
俗話說Final Project就是1%的Implementation加上99%的Future work，相信在經由我們縝密思考且龐大的規畫過後，只要堅持著實做下去，這個題目終有一天能夠變成一個沒有人不愛用的大平台，成為全校最常被使用的服務之一。
 
使用之第三方套件、框架、程式碼:
前端: react, ant design, reactstrap, Material UI, axios
後端: node.js, mongo atlas, express, jwt(jsonwebtoken), passport, crypto

大致分工:
林: 前端主要架構規劃、React router頁面跳轉、axios API初步規格、接單功能、首頁輪播需求單、GCP佈署、前後端API開發、共同解決遇到的bug 
王: 後端主要架構規劃、登入註冊驗證機制、圖片上傳功能、留言板、需求單列與點入詳情樣式、個人資訊頁面、前後端API開發、共同解決遇到的bug 
 
如果此專題是之前作品/專題的延伸，請務必在此說明清楚 (無) 
(Optional) 
課堂建議:
當今前後端技術相當複雜，在一學期內從零開始掌握這些確實相當花心力與課餘時間，
例如到了寫期末專題時也時常因為基本的css跟js問題而卡關許久
既然本門課程內容如此豐富說不定能開成整年的課程(?


