<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tajwid extends CI_Controller {

	public function index()
	{
		$this->load->view('index.html');
	}
	
	public function materi($materi=null, $submateri=null){
		if($materi==null){
			$this->load->view('menu-materi.html');
		}else if ($submateri == null){
			redirect(base_url() . "materi/{$materi}/1");
		}else{
			$this->load->view("materi/materi-{$materi}/materi-{$materi}-{$submateri}.html");
		}
	}
	public function hasil_quiz($lulus){
		if($lulus=="true"){
			$this->load->view("quiz-lulus.html");
		}else{
			$this->load->view("quiz-gagal.html");
		}
	}
	
	public function quiz($level=null, $hasil=null){
		if($level==null){
			$this->load->view('menu-quiz.html');
		}else if ($level=="hasil"){
			$this->hasil_quiz($hasil);
		}else{
			$this->load->view('quiz.html');
		}
	}
	
}
