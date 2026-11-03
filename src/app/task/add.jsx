import React from 'react';
import { router } from 'expo-router';
import { Card, Heading, Page } from '../../components/UI';
import TaskForm from '../../components/TaskForm';
import { useTasks } from '../../context/TaskContext';

export default function AddTask() {
  const { addTask } = useTasks();
  return (
    <Page>
      <Heading title="Tambah Tugas" subtitle="Catat hal penting yang perlu diselesaikan" />
      <Card style={{ padding: 18 }}>
        <TaskForm submitLabel="Simpan tugas" onSubmit={(task) => { addTask(task); router.back(); }} />
      </Card>
    </Page>
  );
}
