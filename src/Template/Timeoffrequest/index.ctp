<div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
    <ul class="nav">
        <a href="/timeoffrequest/add" class="btn btn-primary btn-success">
            <span class="glyphicon glyphicon-time"></span> New Time Off Request
        </a>
    </ul>
</div>
<!-- main area -->
<div class="col-xs-12 col-sm-9">
    <h2 class="sub-header"><?= __('Time Off Request') ?></h2>

    <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#pending">Pending</a></li>
        <li><a data-toggle="tab" href="#approved">Approved</a></li>
        <li><a data-toggle="tab" href="#rejected">Rejected</a></li>
    </ul>
    <div class="tab-content">
        <div id="pending" class="tab-pane fade in active">
            <div class="table-responsive timeoffrequest index large-9 medium-8 columns content">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th><?= $this->Paginator->sort('user_id') ?></th>
                        <th><?= $this->Paginator->sort('start (MM/DD/YY)') ?></th>
                        <th><?= $this->Paginator->sort('end (MM/DD/YY)') ?></th>
                        <th><?= $this->Paginator->sort('created') ?></th>
                        <th><?= $this->Paginator->sort('modified') ?></th>
                        <th><?= $this->Paginator->sort('Message') ?></th>
                        <th class="actions"><?= __('Actions') ?></th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($timeoffrequestpending as $timeoffrequest): ?>
                    <tr>
                        <td><?= $timeoffrequest->has('user') ? $this->Html->Link($timeoffrequest->user->username, ['controller' => 'Users', 'action' => 'view', $timeoffrequest->user->id]) : ' ' ?></td>
                        <td><?= $timeoffrequest->start->format('m/d/y'); ?></td>
                        <td><?= $timeoffrequest->end->format('m/d/y') ?></td>
                        <td><?= h($timeoffrequest->created->format('m/d/y')) ?></td>
                        <td><?= h($timeoffrequest->modified->format('m/d/y'))?></td>
                        <td><?= h($timeoffrequest->sMessage) ?></td>
                        <td class="actions">
                            <?= $this->Html->link(__('View'),
                            ['action' => 'view', $timeoffrequest->id,
                            'escape' => false]
                            ) ?>
                            <?= $this->Html->link(__('Edit'), ['action' => 'edit', $timeoffrequest->id]) ?>
                            <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $timeoffrequest->id],
                            ['confirm'
                            => __('Are you sure you want to delete # {0}?', $timeoffrequest->id)]) ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
                <div class="paginator">
                    <ul class="pagination">
                        <?= $this->Paginator->prev('< ' . __('previous')) ?>
                        <?= $this->Paginator->numbers() ?>
                        <?= $this->Paginator->next(__('next') . ' >') ?>
                    </ul>
                    <p><?= $this->Paginator->counter() ?></p>
                </div>
            </div>
        </div>

        <div id="approved" class="tab-pane fade">
            <div class="table-responsive timeoffrequest index large-9 medium-8 columns content">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th><?= $this->Paginator->sort('user_id') ?></th>
                        <th><?= $this->Paginator->sort('start (MM/DD/YY)') ?></th>
                        <th><?= $this->Paginator->sort('end (MM/DD/YY)') ?></th>
                        <th><?= $this->Paginator->sort('created') ?></th>
                        <th><?= $this->Paginator->sort('modified') ?></th>
                        <th><?= $this->Paginator->sort('Message') ?></th>
                        <th class="actions"><?= __('Actions') ?></th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($timeoffrequestapproved as $timeoffrequest): ?>
                    <tr>
                        <td><?= $timeoffrequest->has('user') ?
                            $this->Text->autoParagraph($timeoffrequest->user->username,
                            ['controller' => 'Users', 'action' => '', $timeoffrequest->user->id]) : '' ?>
                        </td>
                        <td><?= $timeoffrequest->start->format('m/d/y'); ?></td>
                        <td><?= $timeoffrequest->end->format('m/d/y') ?></td>
                        <td><?= h($timeoffrequest->created->format('m/d/y')) ?></td>
                        <td><?= h($timeoffrequest->modified->format('m/d/y'))?></td>
                        <td><?= h($timeoffrequest->sMessage) ?></td>
                        <td class="actions">
                            <?= $this->Html->link(__('View'),
                            ['action' => 'view', $timeoffrequest->id,
                            'escape' => false]
                            ) ?>
                            <?= $this->Html->link(__('Edit'), ['action' => 'edit', $timeoffrequest->id]) ?>
                            <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $timeoffrequest->id],
                            ['confirm'
                            => __('Are you sure you want to delete # {0}?', $timeoffrequest->id)]) ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
                <div class="paginator">
                    <ul class="pagination">
                        <?= $this->Paginator->prev('< ' . __('previous')) ?>
                        <?= $this->Paginator->numbers() ?>
                        <?= $this->Paginator->next(__('next') . ' >') ?>
                    </ul>
                    <p><?= $this->Paginator->counter() ?></p>
                </div>
            </div>
        </div>

        <div id="rejected" class="tab-pane fade">
            <div class="table-responsive timeoffrequest index large-9 medium-8 columns content">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th><?= $this->Paginator->sort('user_id') ?></th>
                        <th><?= $this->Paginator->sort('start (MM/DD/YY)') ?></th>
                        <th><?= $this->Paginator->sort('end (MM/DD/YY)') ?></th>
                        <th><?= $this->Paginator->sort('created') ?></th>
                        <th><?= $this->Paginator->sort('modified') ?></th>
                        <th><?= $this->Paginator->sort('Message') ?></th>
                        <th class="actions"><?= __('Actions') ?></th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($timeoffrequestrejected as $timeoffrequest): ?>
                    <tr>
                        <td><?= $timeoffrequest->has('user') ?
                            $this->Text->autoParagraph($timeoffrequest->user->username,
                            ['controller' => 'Users', 'action' => '', $timeoffrequest->user->id]) : '' ?>
                        </td>
                        <td><?= $timeoffrequest->start->format('m/d/y'); ?></td>
                        <td><?= $timeoffrequest->end->format('m/d/y') ?></td>
                        <td><?= h($timeoffrequest->created->format('m/d/y')) ?></td>
                        <td><?= h($timeoffrequest->modified->format('m/d/y'))?></td>
                        <td><?= h($timeoffrequest->sMessage) ?></td>
                        <td class="actions">
                            <?= $this->Html->link(__('View'),
                            ['action' => 'view', $timeoffrequest->id,
                            'escape' => false]
                            ) ?>
                            <?= $this->Html->link(__('Edit'), ['action' => 'edit', $timeoffrequest->id]) ?>
                            <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $timeoffrequest->id],
                            ['confirm'
                            => __('Are you sure you want to delete # {0}?', $timeoffrequest->id)]) ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
                <div class="paginator">
                    <ul class="pagination">
                        <?= $this->Paginator->prev('< ' . __('previous')) ?>
                        <?= $this->Paginator->numbers() ?>
                        <?= $this->Paginator->next(__('next') . ' >') ?>
                    </ul>
                    <p><?= $this->Paginator->counter() ?></p>
                </div>
            </div>
        </div>
    </div>
</div>
