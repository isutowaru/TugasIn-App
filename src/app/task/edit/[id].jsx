import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, Card, Heading, Page } from '../../../components/UI';
import TaskForm from '../../../components/TaskForm';
import { useTasks } from '../../../context/TaskContext';

export default function EditTask() {
  const { id } = useLocalSearchParams();
  const { tasks, updateTask } = useTasks();
  const task = tasks.find((item) => item.id === id);
  if (!task) return <Page><Heading title="Tugas tidak ditemukan" /><Button title="Kembali" icon="arrow-back" onPress={() => router.back()} /></Page>;
  return (
    <Page>
      <Heading title="Edit Tugas" subtitle="Perbarui detail tugas" />
      <Card style={{ padding: 18 }}>
        <TaskForm initial={task} submitLabel="Simpan perubahan" onSubmit={(changes) => { updateTask(task.id, changes); router.replace(`/task/${task.id}`); }} />
      </Card>
    </Page>
  );
}
