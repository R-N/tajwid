<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tajwid extends CI_Controller {

	function __construct(){
		parent::__construct();
		$this->load->model("quiz");
	}
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
	
	public function quiz($level=null){
		if($level==null){
			$this->load->view('menu-quiz.html');
		}else{
			$level = $this->quiz->get_quiz($level);
			$max_level = $this->quiz->max_level();
			$this->load->view('quiz.html', array(
				"max_level"=>$max_level,
				"level"=>$level
			));
		}
	}
	
}
