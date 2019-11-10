<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Quiz extends CI_Model {
	
	var $levels = [];
	var $max_level = 0;
	
	function __construct(){
		parent::__construct();
		$level1 = new Level(1, [
			new Soal(
				"Bacaan idhar halqi terdapat pada kalimat …",
				[
					"وَمَنْ خَفَّتْ",
					"لِتٌنْذِ رَ",
					"مُنْفَرِيْنَ"
				],
				"وَمَنْ خَفَّتْ"
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
				base_url() . "assets/audio/Soal 11.m4a"
			)
		]);
		$this->levels = array($level1);
		$this->max_level = count($this->levels);
	}

	function get_quiz($level){
		return $this->levels[$level-1];
	}

	function max_level(){
		return $this->max_level;
	}
}

class Level{
	var $level;
	var $soal;
	function __construct($level, $soal) {
		$this->level = $level;
		$this->soal = $soal;
	}
}

class Soal{
	var $soal;
	var $pilihan;
	var $kunci;
	var $audio;
	
	function __construct($soal, $pilihan, $kunci, $audio=null){
		$this->soal = $soal;
		$this->pilihan = $pilihan;
		$this->kunci = $kunci;
		$this->audio = $audio;
	}
}