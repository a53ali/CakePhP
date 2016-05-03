<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Timeoffrequest Controller
 *
 * @property \App\Model\Table\TimeoffrequestTable $Timeoffrequest
 */
class TimeoffrequestController extends AppController
{

    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {

        $id = $this->Auth->user('id');
        $this->paginate = [
                       'contain' => ['Users']
                        ];
        $this->getPending($id);
        $this->getApproved($id);
        $this->getRejected($id);
    }

    /**
     * View method
     *
     * @param string|null $id Timeoffrequest id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        $timeoffrequest = $this->Timeoffrequest->get($id, [
            'contain' => ['Users']
        ]);
        $this->set('timeoffrequest', $timeoffrequest);
        $this->set('_serialize', ['timeoffrequest']);
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $timeoffrequest = $this->Timeoffrequest->newEntity();
        if ($this->request->is('post')) {
            $this->request->data['start'] = array_combine(array('year', 'month', 'day'), explode('-', $this->request->data['start']));
            $this->request->data['end'] = array_combine(array('year', 'month', 'day'), explode('-', $this->request->data['end']));
            //pr($this->request->data);
            //exit;
            $timeoffrequest = $this->Timeoffrequest->patchEntity($timeoffrequest, $this->request->data);
            if ($this->Timeoffrequest->save($timeoffrequest)) {
                $this->Flash->success(__('The timeoffrequest has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The timeoffrequest could not be saved. Please, try again.'));
            }
        }

        $id = $this->Auth->user('id');
        $role = $this->getUserRole($id);
        if($role == "admin" || $role == "manager") {

            $users = $this->Timeoffrequest->Users->find('list', [
                'keyField' => 'id',
                'valueField' => 'username'
            ]);
            $data = $users->toArray();
        }
        else
        {
            $users = $this->Timeoffrequest->Users->find('list', [
                'keyField' => 'id',
                'valueField' => 'username'
            ])->where(['id IS' => intval($id)]);
            $data = $users->toArray();
        }
        //pr($data);
        $this->set(compact('timeoffrequest', 'users'));
        $this->set('_serialize', ['timeoffrequest']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Timeoffrequest id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $timeoffrequest = $this->Timeoffrequest->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $timeoffrequest = $this->Timeoffrequest->patchEntity($timeoffrequest, $this->request->data);
            if ($this->Timeoffrequest->save($timeoffrequest)) {
                $this->Flash->success(__('The timeoffrequest has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The timeoffrequest could not be saved. Please, try again.'));
            }
        }
        $users = $this->Timeoffrequest->Users->find('list', ['limit' => 200]);

        $this->set(compact('timeoffrequest', 'users'));
        $this->set('_serialize', ['timeoffrequest']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Timeoffrequest id.
     * @return \Cake\Network\Response|null Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $timeoffrequest = $this->Timeoffrequest->get($id);
        if ($this->Timeoffrequest->delete($timeoffrequest)) {
            $this->Flash->success(__('The timeoffrequest has been deleted.'));
        } else {
            $this->Flash->error(__('The timeoffrequest could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }


    /**
     * @param $id
     */
    public function getUsersTimeOffRequest($id)
    {
        $this->loadModel('timeoffrequest');
        $tors = $this->timeoffrequest->find('all')
            ->where(['user_id IS' => intval($id)]);

        /*foreach ($tors as $row) {
            debug($row->user_id);
            debug(intval($id));
        }*/

        $this->set('timeoffrequest', $this->paginate($tors));
        $this->set('_serialize', ['timeoffrequest']);

        //$row = $tors->first();
        //pr($row);
    }


    /**
     * @param $id
     */
    public function getUserRole($id)
    {
        $this->loadModel('users');
        $user = $this->users->find('all')
           ->where(['id IS' => intval($id)]);

        return $user->first()->role;
    }

    /**
     * @param $id
     */
    public function getPending($id)
    {

        $role = $this->getUserRole($id);

        if($role == 'admin' || $role == 'manager')
        {
            $this->loadModel('timeoffrequest');
            $tors = $this->timeoffrequest->find('all')
                ->where(['kApprovalStatus =' => '1']);
        }
        else
        {
            $this->loadModel('timeoffrequest');
            $tors = $this->timeoffrequest->find('all')
                ->where(['user_id IS' => intval($id)])
                ->andWhere(['kApprovalStatus =' => '1']);
        }

        $this->set('timeoffrequestpending', $this->paginate($tors));
        $this->set('_serialize', ['timeoffrequestpending']);
    }


    /**
     * @param $id
     */
    public function getApproved($id)
    {

        $role = $this->getUserRole($id);

        if($role == 'admin' || $role == 'manager')
        {
            $this->loadModel('timeoffrequest');
            $tors = $this->timeoffrequest->find('all')
                ->where(['kApprovalStatus =' => '2']);
        }
        else
        {
            $this->loadModel('timeoffrequest');
            $tors = $this->timeoffrequest->find('all')
                ->where(['user_id IS' => intval($id)])
                ->andWhere(['kApprovalStatus =' => '2']);
        }

        $this->set('timeoffrequestapproved', $this->paginate($tors));
        $this->set('_serialize', ['timeoffrequestapproved']);
    }


    /**
     * @param $id
     */
    public function getRejected($id)
    {

        $role = $this->getUserRole($id);

        if($role == 'admin' || $role == 'manager')
        {
            $this->loadModel('timeoffrequest');
            $tors = $this->timeoffrequest->find('all')
                ->where(['kApprovalStatus =' => '3']);
        }
        else
        {
            $this->loadModel('timeoffrequest');
            $tors = $this->timeoffrequest->find('all')
                ->where(['user_id IS' => intval($id)])
                ->andWhere(['kApprovalStatus =' => '3']);
        }

        $this->set('timeoffrequestrejected', $this->paginate($tors));
        $this->set('_serialize', ['timeoffrequestrejected']);
    }

}
