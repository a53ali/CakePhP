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
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <?= $this->Html->meta('icon') ?>
    <?= $this->Html->css('960') ?>
    <?= $this->Html->css('datepicker.min') ?>
    <?= $this->Html->css('bootstrap') ?>
    <?= $this->Html->css('button') ?>
    <?= $this->Html->css('font') ?>
    <?= $this->Html->css('cake') ?>
    <?= $this->Html->css('animate.min') ?>
    <?= $this->Html->css('demo') ?>
    <?= $this->Html->css('light-bootstrap-dashboard') ?>
    <?= $this->Html->css('pe-icon-7-stroke') ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <?= $this->Html->script('bootstrap-datepicker') ?>
    <?= $this->Html->script('bootstrap') ?>
    <?= $this->Html->script('moment.min') ?>
    <?= $this->Html->script('bootstrap-datetimepicker.min') ?>
    <?= $this->Html->script('en-gb') ?>
    <?= $this->Html->script('bootstrap-checkbox-radio-switch') ?>
    <?= $this->Html->script('bootstrap-notify') ?>
    <?= $this->Html->script('bootstrap-select') ?>
    <?= $this->Html->script('chartist.min') ?>
    <?= $this->Html->script('demo') ?>
    <?= $this->Html->script('light-bootstrap-dashboard') ?>
    <?= $this->fetch('meta') ?>
    <?= $this->fetch('css') ?>
    <?= $this->fetch('script') ?>
    <script>
        $(document).ready(function () {
            $('[data-toggle=offcanvas]').click(function () {
                $('.row-offcanvas').toggleClass('active');
            });
        });
    </script>
</head>
<body>
<!---<div id="alert"> <?= $this->Flash->render() ?></div>--->
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">
                Welcome <?php print $this->request->session()->read('Auth.User.username'); ?>
            </a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <?php
                if (!is_null($this->request->session()->read('Auth.User.username'))) {
                    echo '<li><a href="/dashboard">User</a></li>
                           <li><a href="/timeoffrequest">Time Off Request</a></li>';
                }
                ?>
            </ul>
            <form class="navbar-form navbar-right">
                <input type="text" class="form-control" placeholder="Search...">
            </form>
        </div>
    </div>
</nav>


<section class="container clearfix">
    <?= $this->fetch('content') ?>
</section>
<footer>
</footer>
</body>

<div class="modal logoutmodal-sm" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header"><h4>Logout <i class="fa fa-lock"></i></h4></div>
            <div class="modal-body"><i class="fa fa-question-circle"></i> Are you sure you want to log-off?
            </div>
            <div class="modal-footer">
                <?php
                echo $this->Form->button(__('Logout'), array(
                    'action' => 'logout',
                    'class' => 'btn btn-primary pull-right',
                    'type' => 'submit',
                    'id' => "modalLogOut"));
                ?>
            </div>
        </div>
    </div>
</div>
</html>
