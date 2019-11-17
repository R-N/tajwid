function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function max(a, b){
    return a > b ? a : b;
}

function openNav() {
  $(".about").addClass("open");
}

function closeNav() {
  $(".about").removeClass("open");
}

function selectAnswer(button){
    $(".btn-answer").removeClass("answer-selected");
    button.addClass("answer-selected");
    $("#quiz-next").removeClass("disabled");
    $("#quiz-next").removeAttr("disabled");
}

class Quiz{
    constructor(){
        this.level = null;
    }
    loadLevel(level){
        this.nilai = 0;
        this.currentSoalIndex = -1;
        this.level = level;
        level.shuffle();
        $("#content-title").text("Quiz Level " + this.level.level)
        $(".hasil-quiz").addClass("d-none");
        this.nextSoal();
        this.loadSoal();
        $("#quiz").removeClass("d-none");
    }
    currentSoal(){
        return this.level.soal[this.currentSoalIndex];
    }
    
    hitungNilai(){
        return 100.0*this.nilai/this.level.soal.length;
    }

    jawab(){
        let $jawaban = $(".answer-selected");
        if($jawaban.length == 0){
            alert("Anda harus menjawab dulu");
            return;
        }
        if(this.currentSoal().cekJawaban($jawaban.html())){
            ++this.nilai;
        }
        let nextSoal = this.nextSoal();
        if(nextSoal == null){
            this.endQuiz();
        }else{
            nextSoal.load();
        }
    }

    nextSoal(){
        if(this.level.soal.length-1 <= this.currentSoalIndex){
            return null;
        }
        ++this.currentSoalIndex;
        return this.level.soal[this.currentSoalIndex];
    }
     
    loadSoal(){
        this.currentSoal().load();
        $("#content-subtitle").text("Soal " + (this.currentSoalIndex+1));
    }
    endQuiz(){
        $("#quiz").addClass("d-none");
        let skor = this.hitungNilai();
        $(".skor").text(skor);
        if(skor > 80){
            $("#quiz-lulus").removeClass("d-none");
            Cookies.set("level", max(Cookies.get("level"), currentLevelIndex+1));
        }else{
            $("#quiz-gagal").removeClass("d-none");
        }
    }
}

function setLevel(level){
    Cookies.set("level", max(Cookies.get("level"), currentLevelIndex+1));
}
class Level{
    constructor(level, soal){
        this.level = level;
        this.soal = soal;
        this.shuffle();
    }
    shuffle(){
        this.soal = shuffle(this.soal);
    }
}

class Soal {
    constructor(soal, pilihan, kunci, audio=null) {
        this.soal = soal;
        this.pilihan = pilihan;
        this.kunci = kunci;
        this.audio = audio;
    }
    shuffle(){
        this.pilihan = shuffle(this.pilihan);
    }
    cekJawaban(jawaban){
        return jawaban==this.kunci;
    }
    
    load(){
        this.shuffle();
        let i = 0;
        $("#p-soal").html(this.soal);
        $(".btn-answer").addClass("d-none");
        $(".answer-selected").removeClass("answer-selected");
        $("#quiz-next").addClass("disabled");
        $("#quiz-next").attr("disabled", true);
        for(i = 0; i < this.pilihan.length; ++i){
            let $btn = $("#btn-answer-" + (i+1));
            $btn.html(this.pilihan[i]);
            $btn.removeClass("d-none");
        }
        if(this.audio == null){
            $(".audio").addClass("d-none");
            $(".audio source").removeAttr("src");
        }else{
            let $audio = $(".audio").first();
            $audio.removeClass("d-none");
            $audio.find("source").addAttr("src", this.audio);
        }
    }
}

var levels = [
    new Level(1, [
        new Soal(
            "Bacaan Idhar Halqi terdapat pada kalimat ...",
            [
                "وَمَنْ خَفَّتْ",
                "لِتٌنْذِ رَ",
                "مُنْفَرِيْنَ",
                "a"
            ],
            "وَمَنْ خَفَّتْ",
            null
        ),
        new Soal(
            "Jawab A",
            [
                "A",
                "B",
                "C",
                "D",
                "E"
            ],
            "A",
            null
        )
    ]),
    new Level(2, [
        new Soal(
            "Jawab B",
            [
                "A",
                "B",
                "C",
                "D",
                "E"
            ],
            "B",
            null
        ),
        new Soal(
            "Jawab C",
            [
                "A",
                "B",
                "C",
                "D",
                "E"
            ],
            "C",
            null
        )
    ]),
    new Level(3, [
        new Soal(
            "Jawab D",
            [
                "A",
                "B",
                "C",
                "D",
                "E"
            ],
            "D",
            null
        ),
        new Soal(
            "Jawab E",
            [
                "A",
                "B",
                "C",
                "D",
                "E"
            ],
            "E",
            null
        )
    ])
]
var quiz = null;
var currentLevelIndex = 0;
function getLevel(){
    return max(currentLevelIndex+1, Cookies.get("level"));
}
function loadLevel(level){
    currentLevelIndex = level-1;
    quiz = new Quiz();
    quiz.loadLevel(levels[currentLevelIndex]);
}
function jawab(){
    quiz.jawab();
}
function ulangLevel(){
    quiz.loadLevel(levels[currentLevelIndex]);
}
function nextLevel(){
    if(levels.length-1 <= currentLevelIndex){
        alert("Anda sudah menyelesaikan level tertinggi");
        return;
    }
    loadLevel(currentLevelIndex+2);
}

$(document).ready(function(){
    $("#btn-about").click(openNav);
    $(".about .closebtn").click(closeNav);
    $(".btn-answer").click(function(){
        selectAnswer($(this))
    });
    $("#quiz-next").click(function(){
        quiz.jawab();
    });
    $("#quiz").ready(function(){
        loadLevel(1);
    });
    $("#btn-next-level").click(nextLevel);
    $("#btn-repeat-level").click(ulangLevel);
    setLevel(1);
    let level = getLevel();
    currentLevelIndex = level-1;
    $(".pilihan-quiz").each(function(){
        
        var $this = $(this);
        let lv = $(this).attr("data-level");
        if(lv > level){
            $(this).addClass("locked");
            $(this).find("a").addClass("disabled");
        }else{
            $(this).removeClass("locked");
            $(this).find("a").removeClass("disabled");
        }
    });
});