// src/components/TinyMCE.js
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';

import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/help';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/wordcount';

function TinyMCE({ value, onChange }) {
  return (
    <Editor
      value={value}
      onEditorChange={onChange}
      init={{
        height: 400,
        menubar: true,
        plugins: 'image link code help table lists wordcount',
        toolbar:
          'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code help',
        automatic_uploads: true,
        file_picker_types: 'image',
        base_url: '/tinymce',
        suffix: '.min',
      }}
    />
  );
}

export default TinyMCE;
