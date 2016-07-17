<!-- File: src/Template/Users/login.ctp -->
<script type="text/javascript" src="/js/typed.js"></script>
<script>
    $(function () {

        $("#typed").typed({
            strings: ["NetSuite is the world's leading provider of cloud-based business", "Who is core?", "Well....", "Core is responsible for developing all the software"],
            typeSpeed: 30,
            loop:true
        });

    });
</script>
<link rel="stylesheet" href="/css/login.css">

<?php
    $this->set('background', '../img/header-bg.jpg');
    $this->set('background-size', '100%');
    ?>

<div class="row vertical-offset-100 header">
    <div class="text-editor-wrap">
        <div class="title-bar"><span class="title">typed.js — bash — 80x<span class="terminal-height">10</span></span>
        </div>
        <div class="text-body">
            $ <span id="typed">NetSuite Core HRIS allows you to manage a global workforce.</span><span
                class="typed-cursor"></span>
        </div>


        <div class="login">
            <div class="login__form">
                <div class="login__row">
                    <?= $this->Form->create('BoostCake', array(
                    'inputDefaults' => array(
                    'label' => false,
                    'wrapInput' => false,
                    ),
                    'class' => 'form col-md-12 center-block'
                    )); ?>
                    <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
                        <!--<path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8"/>-->
                    </svg>
                    <?= $this->Form->input('username', array(
                    'label' => '',
                    'class' => 'login__input name',
                    'placeholder' => 'Username'
                    )); ?>
                </div>
                <div class="login__row">
                    <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
                        <!--<path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0"/>-->
                    </svg>
                    <?= $this->Form->input('password', array(
                    'label' => '',
                    'class' => 'login__input pass',
                    'placeholder' => 'Password')); ?>
                </div>
                <?= $this->Form->button(__('Login'), array(
                'type' => 'submit',
                'class' => 'login__submit',
                'escape' => false,
                'id' => 'btnLogin'
                ));
                ?>
                <p class="login__signup">
                    <?php
                    echo $this->Html->link("Don't have an account? Sign up", array(
                    'action' => 'add',
                    ));
                    ?>
                </p>
            </div>
        </div>
    </div>
</div>
