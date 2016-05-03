<div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
    <ul class="nav">
        <a href="javascript:history.back()">
            <i class="pe-7s-back"></i>

            <p>Go Back</p>
        </a>
    </ul>
</div>
<!-- main area -->
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="row">
                        <?= $this->Form->create($user) ?>
                        <fieldset>
                            <legend><?= __('Add User') ?></legend>
                            <?php
                            echo $this->Form->input('username', array(
                                'label' => '',
                                'class' => 'form-control',
                                'before' => '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>',
                                'placeholder' => 'Username'
                            ));
                            echo $this->Form->input('password', array(
                                'label' => '',
                                'class' => 'form-control',
                                'before' => '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>',
                                'placeholder' => 'Password'
                            ));
                            echo $this->Form->input('role', array(
                                'options' => ['manager' => 'Manager', 'employee' => 'Employee'],
                                'label' => '',
                                'class' => 'form-control',
                                'before' => '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>',
                            ));
                            echo '<div class="form-group">';
                            ?>
                        </fieldset>
                        <div class="btn-toolbar">
                            <?= $this->Form->button(__('Submit'), array(
                                'div' => 'form-group',
                                'class' => 'btn btn-lg btn-success pull-right'
                            )); ?>
                        </div>
                    </div>
                    <?= $this->Form->end() ?>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
