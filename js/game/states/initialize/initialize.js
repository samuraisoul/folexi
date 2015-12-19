function Initialize(drawingStage, renderer, stateManager) {
    this.drawingStage = drawingStage;
    this.renderer = renderer;
    this.stateManager = stateManager;
    this.initializationStarted = false;
}
    
Initialize.prototype.start = function() {
    this.stateManager.states[GAME].initialize();
    this.stateManager.state = GAME;
    this.hide();
    this.initializationStarted = false;
}
        
Initialize.prototype.getWords = function() {
    $.ajax({
        type: "POST",
        url: PUBLIC_URL + "dic/get",
        context: this,
        data: {
            lang1: this.stateManager.lang1,
            lang2: this.stateManager.lang2,
            level : this.stateManager.wordLevel
        },
        success: function(json) {
            this.stateManager.dic = json.data.dic;
            this.makeLevels();
            this.getKnownWords();
        },
        dataType: "json"
    });
};
    
Initialize.prototype.makeActiveKnownWords = function() {
    this.stateManager.activeKnownWords = [];
    for(var i = 0; i < this.stateManager.knownWords.length; i++) {
        if(this.stateManager.knownWords[i]['right'] <= RIGHT_TO_KNOWN && this.stateManager.knownWords[i]['word']['diff_lvl'] == this.stateManager.wordLevel) {
            this.stateManager.activeKnownWords.push(this.stateManager.knownWords[i]);
        }
    }
}
    
Initialize.prototype.getKnownWords = function() {
    $.ajax({
        type: "POST",
        url: PUBLIC_URL + "dic/get-known-words",
        context: this,
        data: {
            lang1: this.stateManager.lang1,
            lang2: this.stateManager.lang2
        },
        success: function(json) {
            if(json.status === "OK"){
                this.stateManager.knownWords = json.data;
                this.makeActiveKnownWords();
                this.start();
            }
        },
        dataType: "json"
    });
}

Initialize.prototype.initializeLoadingText = function() {
    this.loadingText = new PIXI.Text("LOADING...", {font : "bold 8em Ariel Black, sans-serif"});
    this.loadingText.x = (this.renderer.width / 2) - (this.loadingText.getBounds()['width'] / 2);
    this.loadingText.y = (this.renderer.height / 2) - (this.loadingText.getBounds()['height'] / 2);
}

Initialize.prototype.hide = function() {
    this.drawingStage.removeChild(this.loadingText);
    this.loadingText.destroy();
}

Initialize.prototype.draw = function() {
    this.drawingStage.addChild(this.loadingText);
    this.renderer.render(this.drawingStage);
}
    
Initialize.prototype.initialize = function() {
    if(!this.initializationStarted) {
        this.initializationStarted = true;
        this.initializeLoadingText();
        this.stateManager.states[START_MENU].hide();
        this.getWords(this.getKnownWords);
    }
}

Initialize.prototype.isBlankOrNull = function(str) {
    return (str == "" || str == null);
}

Initialize.prototype.makeLevels = function() {
    var blankWords = 0;
    for(var i = 0; i < this.stateManager.dic.length; i++) {
        //skip words that don't exist in selected languages
        if(this.isBlankOrNull(this.stateManager.dic[i]['lang2']) || this.isBlankOrNull(this.stateManager.dic[i]['lang1'])) {
            blankWords++;
            continue;
        }
        //add array if starting a new level 
        //subtract blank word count to be sure there are no arrays of 2
        if(i == 0 || (i - blankWords) % WORDS_PER_LEVEL == 0) {
            this.stateManager.levels.push([]);
        }
        //Math.floor forces integer division
        this.stateManager.levels[Math.floor((i - blankWords) / WORDS_PER_LEVEL)].push(this.stateManager.dic[i]);
    }
}