<script type='text/javascript'>  
    // Parses returned response and extracts  
    // the title, links, and text of each news story.  
    function top_stories(o){  
      var items = o.query.results.item; 
      var no_items=items.length;   
      var title = items[1].title; 
        
      // Place news stories in div tag  
      document.getElementById('results').innerHTML = title;    
    }  
    </script>  
