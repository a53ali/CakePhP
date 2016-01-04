<div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
    <ul class="nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $user->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $user->id)]
            )
            ?>
        </li>
        <li><?= $this->Html->link(__('List Users'), ['action' => 'index']) ?></li>
    </ul>
</div>
<!-- main area -->
<div class="users form large-9 medium-8 columns content">
    <?= $this->Form->create($user) ?>
    <fieldset>
        <fieldset>
            <legend><?= __('Edit User') ?></legend>
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
                'options' => ['admin' => 'Admin', 'author' => 'Author'],
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
