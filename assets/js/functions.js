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
	ulangLevel(){
		this.loadLevel(this.level);
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
			this.loadSoal();
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
        if(skor >= 70){
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
    constructor(level){
        this.level = level.level;
        this.soal = [];
		for(let i = 0; i < level.soal.length; ++i){
			this.soal.push(new Soal(level.soal[i]));
		}
        this.shuffle();
    }
    shuffle(){
        this.soal = shuffle(this.soal);
    }
}

class Soal {
    constructor(soal) {
        this.soal = soal.soal;
        this.pilihan = soal.pilihan;
        this.kunci = soal.kunci;
        this.audio = soal.audio;
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
			$(".audio").removeAttr("src");
            //$(".audio source").removeAttr("src");
        }else{
            let $audio = $(".audio").first();
            $audio.removeClass("d-none");
            $audio.attr("src", this.audio);
        }
    }
}

var quiz = null;
var currentLevelIndex = 0;
function getLevel(){
    return max(currentLevelIndex+1, Cookies.get("level"));
}
function loadLevel(level){
    currentLevelIndex = level.level-1;
    quiz = new Quiz();
    quiz.loadLevel(level);
}
function jawab(){
    quiz.jawab();
}
function ulangLevel(){
    quiz.ulangLevel();
}
function nextLevel(){
    if(maxLevelIndex <= currentLevelIndex){
        alert("Anda sudah menyelesaikan level tertinggi");
		window.location.replace(baseUrl + "quiz");
    }else{
		window.location.replace(baseUrl + "quiz/" + (currentLevelIndex+2));
	}
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
})