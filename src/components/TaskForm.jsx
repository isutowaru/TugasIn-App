import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Chip, Field, Label } from './UI';
import { C, categories, priorities, statuses } from '../constants/theme';

const priorityTints = { High: C.danger, Medium: C.warning, Low: C.success };
const statusTints = { 'To Do': C.warning, 'In Progress': C.primary, Completed: C.success };

export default function TaskForm({ initial, submitLabel, onSubmit }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [deadline, setDeadline] = useState(initial?.deadline || new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState(initial?.category || categories[0]);
  const [priority, setPriority] = useState(initial?.priority || 'Medium');
  const [status, setStatus] = useState(initial?.status || 'To Do');

  const submit = () => {
    if (!title.trim()) return Alert.alert('Judul diperlukan', 'Isi judul tugas terlebih dahulu.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline) || Number.isNaN(new Date(`${deadline}T00:00:00`).getTime())) return Alert.alert('Tanggal tidak valid', 'Gunakan tanggal valid dengan format YYYY-MM-DD.');
    onSubmit({ title: title.trim(), description: description.trim(), deadline, category, priority, status });
  };
  const choices = (label, values, selected, setValue, tints) => (
    <View style={{ marginBottom: 21 }}>
      <Label>{label}</Label>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {values.map((value) => <Chip key={value} label={value} active={selected === value} color={tints?.[value]} onPress={() => setValue(value)} />)}
      </View>
    </View>
  );

  return (
    <View>
      <Field label="Judul tugas" value={title} onChangeText={setTitle} placeholder="Contoh: Review materi UTS" />
      <Field label="Deskripsi" value={description} onChangeText={setDescription} placeholder="Tambahkan detail tugas..." multiline />
      <Field label="Deadline (YYYY-MM-DD)" value={deadline} onChangeText={setDeadline} placeholder="2026-11-02" />
      {choices('Kategori', categories, category, setCategory)}
      {choices('Prioritas', priorities, priority, setPriority, priorityTints)}
      {choices('Status', statuses, status, setStatus, statusTints)}
      <Button title={submitLabel} icon="checkmark" onPress={submit} style={{ marginTop: 2 }} />
    </View>
  );
}
