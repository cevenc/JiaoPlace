(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  选择照片 */
    
    
        /* button  确定 */
    
    
        /* button  确定 */
    
    
        /* button  确定 */
    
    
        /* button  .uib_w_3 */
    $(document).on("click", ".uib_w_3", function(evt)
    {
    });
    
        /* button  .uib_w_3 */
    $(document).on("click", ".uib_w_11", function(evt)
    {
		navigator.app.exitApp();
    });
    
        /* button  .uib_w_13 */
    $(document).on("click", ".uib_w_13", function(evt)
    {
        onDeviceReadyi(); 
    });
    
        /* button  .uib_w_14 */
    $(document).on("click", ".uib_w_14", function(evt)
    {
         activate_page("#select"); 
    });
    
        /* button  .uib_w_12 */
    $(document).on("click", ".uib_w_12", function(evt)
    {
         activate_page("#mainpage"); 
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
