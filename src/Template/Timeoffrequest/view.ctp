<div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Edit Timeoffrequest'), ['action' => 'edit', $timeoffrequest->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Timeoffrequest'), ['action' => 'delete', $timeoffrequest->id], ['confirm' => __('Are you sure you want to delete # {0}?', $timeoffrequest->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Timeoffrequest'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Timeoffrequest'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?> </li>
    </ul>
</div>

<div class="timeoffrequest view large-9 medium-8 columns content">
    <h2 class="sub-header"><?= h($timeoffrequest->id) ?></h2>

    <div class="table-responsive">
        <table class="table table-striped">
            <tr>
                <th><?= __('User') ?></th>
                <td><?= $timeoffrequest->has('user') ? $this->Html->link($timeoffrequest->user->username, ['controller' => 'Users', 'action' => 'view', $timeoffrequest->user->id]) : '' ?></td>
            </tr>
            <tr>
                <th><?= __('SMessage') ?></th>
                <td><?= h($timeoffrequest->sMessage) ?></td>
            </tr>
            <tr>
                <th><?= __('Id') ?></th>
                <td><?= $this->Number->format($timeoffrequest->id) ?></td>
            </tr>
            <tr>
                <th><?= __('KApprovalStatus') ?></th>
                <td><?= h($timeoffrequest->kApprovalStatus) ?></td>
            </tr>
            <tr>
                <th><?= __('Start') ?></th>
                <td id="start"><?= h($timeoffrequest->start) ?></td>
            </tr>
            <tr>
                <th><?= __('End') ?></th>
                <td id="end"><?= h($timeoffrequest->end) ?></td>
            </tr>
            <tr>
                <th><?= __('Created') ?></th>
                <td><?= h($timeoffrequest->created) ?></td>
            </tr>
            <tr>
                <th><?= __('Modified') ?></th>
                <td><?= h($timeoffrequest->modified) ?></td>
            </tr>
        </table>
    </div>
</div>

