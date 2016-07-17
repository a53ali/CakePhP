<div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
    <ul class="nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Edit Time Off Request'), ['action' => 'edit', $timeoffrequest->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Time Off Request'), ['action' => 'delete', $timeoffrequest->id], ['confirm' => __('Are you sure you want to delete # {0}?', $timeoffrequest->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Time Off Request'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Time Off Request'), ['action' => 'add']) ?> </li>
        <!--<li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?> </li>-->
        <!--<li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?> </li>-->
    </ul>
</div>

<div class="timeoffrequest view large-9 medium-8 columns content">
    <h2 class="sub-header"><?= $this->Html->link(ucfirst($timeoffrequest->user->username), ['controller' => 'Users', 'action' => 'view', $timeoffrequest->user->id]) ?>'s Time Off Request</h2>

    <div class="table-responsive">
        <table class="table table-striped">
            <tr>
                <th><?= __('Start') ?></th>
                <td id="start"><?= h($timeoffrequest->start->format('m/d/y')) ?></td>
            </tr>
            <tr>
                <th><?= __('End') ?></th>
                <td id="end"><?= h($timeoffrequest->end->format('m/d/y')) ?></td>
            </tr>
            <tr>
                <th><?= __('Created') ?></th>
                <td><?= h($timeoffrequest->created->format('m/d/y')) ?></td>
            </tr>
            <tr>
                <th><?= __('Modified') ?></th>
                <td><?= h($timeoffrequest->modified->format('m/d/y')) ?></td>
            </tr>
            <tr>
                <th><?= __('Approval Status') ?></th>
                <td><?= $timeoffrequest->kApprovalStatus == '1' ? 'Pending' : 'Approved' ?></td>
            </tr>
            <tr>
                <th><?= __('Message To Manager') ?></th>
                <td><?= h($timeoffrequest->sMessage) ?></td>
            </tr>
        </table>
    </div>
</div>

