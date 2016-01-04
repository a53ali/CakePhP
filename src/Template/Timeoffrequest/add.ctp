<div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
    <ul class="nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('List Time Off Request'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?></li>
    </ul>
</div>
<!-- main area -->
<div class="timeoffrequest form large-9 medium-8 columns content">
    <?= $this->Form->create($timeoffrequest, array('role' => 'form')) ?>
    <fieldset>
        <legend><?= __('Add Timeoffrequest') ?></legend>
        <?php

        echo '<div class="col-xs-12 col-sm-9"><div class="row"> <div class="col-md-6">';
        echo '<div class="form-group">';
        echo $this->Form->input('user_id', array(
            'class' => 'form-control',
            'options' => $users
        ));
        echo '</div>';
        echo '</div><div class="col-md-6">';
        echo $this->Form->input('kApprovalStatus', array(
            'class' => 'form-control',
            'label' => 'Approval Status',
            'options' => ['1' => 'Pending', '2' => 'Approved'],
            'default' => '1'));
        echo '</div></div></div>';

        echo '<div class="col-xs-12 col-sm-9"><div class="row"> <div class="col-md-6">';
        echo '<label>Start Date</label>';
        echo '<div class="input-group date" id="start">';
        echo $this->Form->text('start', array(
            'class' => 'form-control',
            'label' => 'Start Date',
            'id' => 'start'
        ));
        echo '<span class="input-group-addon"><span class="glyphicon-calendar glyphicon"></span></span>';
        echo '</div>';
        echo '</div><div class="col-md-6">';
        echo '<label>End Date</label>';
        echo '<div class="input-group date" id="end">';
        echo $this->Form->text('end', array(
            'class' => 'form-control',
            'label' => 'End Date',
            'id' => 'end'
        ));
        echo '<span class="input-group-addon"><span class="glyphicon-calendar glyphicon"></span></span>';
        echo '</div></div></div>';

        echo '<div class="form-group">';
        echo $this->Form->input('sMessage', array(
            'class' => 'form-control',
            'label' => 'Message to Manager',
            'rows' => '5'
        ));
        echo '</div>';
        echo '<div class="form-group">';
        ?>
        <p>You are taking
            <input type="text" id="different" disabled/>
            days off.
        </p>
    </fieldset>
    <?= $this->Form->button(__('Submit'), array(
        'div' => 'form-group',
        'class' => 'btn btn-lg btn-success pull-right'
    ));
    ?>
    <?= $this->Form->end() ?>

</div>
</div>
