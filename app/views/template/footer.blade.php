<footer class="wrapper">
    <div class="row">
        <div class="left col_4"> 
            Comment/Suggestion/Bug?<br> Contact us at: folexi.info@gmail.com
        </div>
        <div class="social col_4">
            <a href="https://twitter.com/Folexi_Info" class="twitter-follow-button social_button" data-show-count="false" data-show-screen-name="false">Follow @Folexi_Info</a>
            <script>
                !function(d,s,id){
                    var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
                    if(!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + '://platform.twitter.com/widgets.js';
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, 'script', 'twitter-wjs');
            </script>
            <div id="fb-root" class="social_button"></div>
            <script>(function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=442529005803351";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            </script>
            <div class="fb-share-button" data-href="http://folexi.com" data-type="button"></div>
        </div>
        <div class="right col_4">
            @if(Auth::check() && Auth::user()->level >= 100)
                <a href="{{URL::to('admin')}}">ADMIN</a> 
            @endif
            <a href="{{URL::to('info/faq')}}">FAQ</a> 
            <a href="{{URL::to('info/about')}}">ABOUT</a>
            <a href="{{URL::to('info/explanation')}}">EXPLANATION</a>
            @if(Auth::check())
                <span id='logout' class='clickable'>LOGOUT</span>
            @endif
        </div>
    </div>
</footer>