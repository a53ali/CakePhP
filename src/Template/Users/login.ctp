<!-- File: src/Template/Users/login.ctp -->

<div class="row vertical-offset-100">
    <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">

            <!-- Panel Heading -->
            <div class="panel-heading">
                <div class="row-fluid user-row">
                    <img src="http://s11.postimg.org/7kzgji28v/logo_sm_2_mr_1.png" class="img-responsive"
                         alt="Conxole Admin"/>
                </div>
            </div>
            <!-- End panel heading -->

            <!-- Panel body -->
            <div class="users form modal-body panel-body panel">
                <legend><?= __('Sign In') ?></legend>
                <?= $this->Form->create('BoostCake', array(
                    'inputDefaults' => array(
                        'div' => 'form-group',
                        'label' => false,
                        'wrapInput' => false,
                        'class' => 'form-control'
                    ),
                    'class' => 'form col-md-12 center-block'
                )); ?>
                <div class="input-group">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span> </span>
                    <?= $this->Form->input('username', array(
                        'label' => '',
                        'class' => 'form-control',
                        'placeholder' => 'Username'
                    )); ?>
                </div>

                <div class="input-group">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span> </span>
                    <?= $this->Form->input('password', array(
                        'label' => '',
                        'class' => 'form-control',
                        'div' => 'input-group input-password',
                        'placeholder' => 'Password')); ?>
                </div>
                <div class="form-group">
                    <?= $this->Form->button(__('Login'), array(
                        'type' => 'submit',
                        'class' => 'form-control btn btn-primary btn-lg pull-right btn badge badge-primary badge-btn',
                        'escape' => false,
                        'id' => 'btnLogin'
                    ));
                    ?>

                    <?php
                    echo $this->Html->link("Create New User", array(
                        'action' => 'add',
                    ));
                    ?>
                </div>
                <?= $this->Form->end() ?>
            </div>
        </div>
    </div>
</div>
