
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  height = 500,
  placeholder = 'Write your content here...'
}) => {
  const editorRef = useRef<any>(null);

  return (
    <Editor
      apiKey="no-api-key" // For production, you should register for an API key at https://www.tiny.cloud/
      onInit={(evt, editor) => editorRef.current = editor}
      initialValue={value}
      value={value}
      onEditorChange={(newValue) => onChange(newValue)}
      init={{
        height,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
          'emoticons', 'codesample'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | link image media codesample | code fullscreen',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        placeholder: placeholder,
        images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
          // In a real application, you would upload to your server or a third-party service
          // For this demo, we'll create a data URL
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.onerror = () => reject('Image upload failed');
          reader.readAsDataURL(blobInfo.blob());
        }),
        link_default_target: '_blank',
        link_title: true,
        link_assume_external_targets: true,
        relative_urls: false,
        remove_script_host: false,
        convert_urls: true,
        branding: false,
        entity_encoding: 'raw'
      }}
    />
  );
};

export default RichTextEditor;
