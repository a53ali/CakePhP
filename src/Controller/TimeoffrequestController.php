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
        $this->paginate = [
            'contain' => ['Users']
        ];
        $this->set('timeoffrequest', $this->paginate($this->Timeoffrequest));
        $this->set('_serialize', ['timeoffrequest']);
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
        $users = $this->Timeoffrequest->Users->find('list', [
            'keyField' => 'id',
            'valueField' => 'username'
        ]);
        $data = $users->toArray();
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
}
