<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Quiz extends CI_Model {
	
	var $levels = [];
	var $max_level = 0;
	
	function __construct(){
		parent::__construct();
		$level1 = new Level(1, [
			//soal 1
			new Soal(
				"Bacaan idhar halqi terdapat pada kalimat ...",
				[
					"وَمَنْ خَفَّتْ",
					"لِتٌنْذِ رَ",
					"مُنْفَرِيْنَ"
				],
				"وَمَنْ خَفَّتْ"
			),
			
			//soal 2
			new Soal(
				"Bacaan Idgham Bighunnah terdapat pada kalimat ...",
				[
					"كُنْتُمْ",
					"مَنْ يَقُوْ لُ",
					"يُنْزِ فُوْنَ"
				],
				"مَنْ يَقُوْ لُ"
			),

			//soal 3
			new Soal(
				"Sebutkan huruf-huruf Idghom Bilaghunnah!",
				[
					"ي ن م و",
					"ر ل",
					"ح خ ع غ م ء"
				],
				"ر ل"
			),

			//soal 4
			new Soal(
				"Bacaan Idgham Syamsiyah terdapat pada kalimat ...",
				[
					"اْلقَمَرِ",
					"اْلبَلَرُ",
					"السَّمَآءُ"
				],
				"السَّمَآءُ"
			),

			//soal 5
			new Soal(
				"Sebutkan huruf-huruf Idzhar Qomariyah!",
				[
					"ب ج ح خ ع غ ف ق ك م و ه ء ي",
					"ت ث د ذ ر ز س ش ص ض ط ظ ل ن",
					"ي ن م و"
				],
				"ب ج ح خ ع غ ف ق ك م و ه ء ي"
			),

			//soal 6
			new Soal(
				"Bacaan Idgham Mimi tedapat pada kalimat ...",
				[
					"يَوْمَ يَكُونُ",
					"مِشْلَهُمْ مَعَهٌمْ",
					"يَوْمَتَرَى"
				],
				"مِشْلَهُمْ مَعَهٌمْ"
			),

			//soal 7
			new Soal(
				"Bacaan Idzhar Syafawi terdapat pada kalimat ...",
				[
					"مِثْلَهُمْ مَعَهُمْ",
					"لَعلَّكُمْ مِثْلَهُمْ",
					"اَيْمَانَهُمْ جُنَّةً"
				],
				"اَيْمَانَهُمْ جُنَّةً"
			),
			
			//soal 8
			new Soal(
				"Sebutkan huruf Ikhfa' Syafawi!",
				[
					"ن",
					"ت",
					"ب"
				],
				"ب"
			),

			//soal 9
			new Soal(
				"Sebutkan huruf-huruf Ikhfa'!",
				[
					"ي ن م و ء ه ح خ ر ل ع ب ا",
					"ت ث ج د ن ز س ش ص ض ط ظ ف ق ك",
					"م ب"
				],
				"ت ث ج د ن ز س ش ص ض ط ظ ف ق ك"
			),

			//soal 10
			new Soal(
				"Bacaan Iqlab terdapat pada kalimat ...",
				[
					"فَ نْبِكَ",
					"اْلاَنْهَرُ",
					"اَنْزَلَ"
				],
				"فَ نْبِكَ"
			)
		]);
		$this->levels = array($level1);
		
		$level2 = new Level(2, [
			//soal 11
			new Soal(
				"مِمَّا, Merupakan bacaan?",
				[
					"Idgham Mimi",
					"Ghunnah",
					"Idgham Bighunnah"
				],
				"Ghunnah",
				base_url("assets/audio/Soal 11.m4a")
			),

			//soal 12
			new Soal(
				"ب ج د ط ق, Termasuk dalam huruf-huruf?",
				[
					"Idzhar Halqi",
					"Idgham Bighunnah",
					"Qalqalah"
				],
				"Qalqalah",
				base_url("assets/audio/Soal 12.m4a")
			),

			//soal 13
			new Soal(
				"اَقُلْ لَكَ, Merupakan bacaaan?",
				[
					"Ghunnah",
					"Idgham Mimi",
					"Idgham Mutamatsilain"
				],
				"Idgham Mutamatsilain",
				base_url("assets/audio/Soal 13.m4a")
			),

			//soal 14
			new Soal(
				"Bacaan Idgham Mutaqoribain terdapat pada ...",
				[
					"قُلْ رَبِّ اَدْ خِلْنِيْ",
					"مِنْ دِ يَارِهِمْ",
					"بِاَيْدِ يْهِمْ"
				],
				"قُلْ رَبِّ اَدْ خِلْنِيْ"
			),

			//soal 15
			new Soal(
				"وَقَالَتْ طَا لِفَةُ, Merupakan bacaan?",
				[
					"Idgham Mutamatsilain",
					"Idgham Mutajanisain",
					"Idgham Mutaqaribain"
				],
				"Idgham Mutajanisain",
				base_url("assets/audio/Soal 15.m4a")
			)

		]);
		$this->levels = array($level2);
		
		$level3 = new Level(3,[
			//soal 16
			new Soal(
				"تُبْدُ وْ نَ, Merupakan bacaan?",
				[
					"Mad Iwadh",
					"Mad Layyin",
					"Mad Thobi'i"
				],
				"Mad Thobi'i",
				base_url("assets/audio/Soal 16.m4a")
			),

			//soal 17
			new Soal(
				"السَّمَآءِ , Merupakan bacaan?",
				[
					"Mad Wajib Muttasil",
					"Mad Jaiz Munfasil",
					"Mad Thobi'i"
				],
				"Mad Wajib Muttasil",
				base_url("assets/audio/Soal 17.m4a")
			),

			//soal 18
			new Soal(
				"إِنَّآأَنْزَلْنَهُ, Merupakan bacaan?",
				[
					"Mad Arid Lis Sukun",
					"Mad iwadh",
					"Mad Jaiz Munfasil"
				],
				"Mad Iwadh",
				base_url("assets/audio/Soal 18.m4a")
			),

			//soal 19
			new Soal(
				"كَآفَّهً, Merupakan bacaan?",
				[
					"Mad Jaiz Munfasil",
					"Mad Lazim Kilmi Mutsaqqol",
					"Mad Wajib Muttasil"
				],
				"Mad Lazim Kilmi Mutsaqqol",
				base_url("assets/audio/Soal 19.m4a")
			),

			//soal 20
			new Soal(
				"فَوَيْلُ لِّلْمُصَلِّيْنَ, Merupakan bacaan?",
				[
					"Mad Jaiz Munfasil",
					"Mad Arid Lis Sukun",
					"Mad Iwadh"
				],
				"Mad Arid Lis Sukun",
				base_url("assets/audio/Soal 20.m4a")
			)
		]);
		$this->levels = array($level3);
		
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