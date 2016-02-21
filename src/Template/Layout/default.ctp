<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @since         0.10.0
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

$cakeDescription = 'CakePHP: the rapid development php framework';
?>
<!DOCTYPE html>
<html>
<head>
    <?= $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <?= $cakeDescription ?>:
        <?= $this->fetch('title') ?>
    </title>
    <?= $this->Html->meta('icon') ?>
    <?= $this->Html->css('960') ?>
    <?= $this->Html->css('button') ?>
    <?= $this->Html->css('animate.min') ?>
    <?= $this->Html->css('demo') ?>
    <?= $this->Html->css('dashboard') ?>
    <?= $this->Html->css('pe-icon-7-stroke') ?>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <?= $this->Html->css('datepicker.min') ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script type="text/javascript" src="/js/moment.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="/js/en-gb.js"></script>
    <script type="text/javascript" src="/js/date.js"></script>
    <?= $this->fetch('meta') ?>
    <script>
        $(document).ready(function () {
            $('[data-toggle=offcanvas]').click(function () {
                $('.row-offcanvas').toggleClass('active');
            });
        });
    </script>
</head>
<body>
<div id="alert"> <?= $this->Flash->render() ?></div>
<div class="wrapper">
    <div class="sidebar" data-color="purple" data-image="http://media.tumblr.com/tumblr_mc5glr2tsY1qefhwn.jpg">
        <div class="sidebar-wrapper">
            <div class="logo">
                <a href="#" class="simple-text">
                    Welcome <?php print $this->request->session()->read('Auth.User.username'); ?>
                </a>
            </div>

            <ul class="nav">
                <li class="active">

                    <a href="#">
                        <i class="pe-7s-graph"></i>

                        <p>Dashboard</p>
                    </a>
                </li>
                <li>
                    <?php
                    if (!is_null($this->request->session()->read('Auth.User.username'))) {
                        echo '<a href="/users/view/';
                        echo $this->request->session()->read('Auth.User.id');
                        echo '">';
                        echo '<i class="pe-7s-user"></i>';
                        echo '<p>User Profile</p>';
                    } else {
                        echo '<a href="/login"';
                    }
                    ?>
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <div class="main-panel">
        <nav class="navbar navbar-default navbar-fixed">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                            data-target="#navigation-example-2">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Dashboard</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                                <?php
                                if (!is_null($this->request->session()->read('Auth.User.username'))) {
                                    echo '<a href="/users/view/';
                                    echo $this->request->session()->read('Auth.User.id');
                                    echo '">';
                                    echo 'Account';
                                }
                                ?>
                            </a>
                        </li>
                        <?php
                        if (!is_null($this->request->session()->read('Auth.User.username'))) {
                            echo '<li><a href="/dashboard">User</a></li>
                           <li><a href="/timeoffrequest">Time Off Request</a></li>';
                            echo '<li>';
                            echo $this->Html->link(('Logout'), array('controller'=>'users', 'action'=>'logout'));
                            echo '</li>';
                        }
                        ?>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="content">
            <section class="container clearfix">
                <?= $this->fetch('content') ?>
            </section>
        </div>


        <footer class="footer">
            <div class="container-fluid">
                <p class="copyright pull-right">
                    &copy; 2015 made with love for a better web
                </p>
            </div>
        </footer>

    </div>
</div>


</body>
</html>
