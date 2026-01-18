import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const MaskedInput = ({ value = '', onChange }) => {
  const [show, setShow] = useState(false);

  // Convert real value to masked display value
  const maskValue = (val) => {
    if (show) return val; // Show full when eye is open
    if (!val) return '';

    const len = val.length;

    if (len <= 8) {
      return 'X'.repeat(len);
    }
    if (len > 8 && len < 12) {
      return 'XXXXXXXX' + val.slice(8);
    }
    if (len === 12) {
      return val;
    }
    return val;
  };

  // Capture REAL digits before masking
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      onChange(value.slice(0, -1));
      return;
    }

    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    if (value.length >= 12) {
      e.preventDefault();
      return;
    }

    const newVal = value + e.key;
    onChange(newVal);
    e.preventDefault(); // stop Input from placing actual key (we will show masked)
  };

  return (
    <div style={{ position: 'relative' }}>
      <Input
        value={maskValue(value)} // masked output
        onKeyDown={handleKeyDown} // REAL input handling
        placeholder="Enter number"
      />

      {/* Eye toggle */}
      <span
        style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
        onClick={() => setShow(!show)}
      >
        {show ? <EyeInvisibleOutlined /> : <EyeOutlined />}
      </span>
    </div>
  );
};

MaskedInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const MyForm = () => {
  return (
    <Form layout="vertical">
      <Form.List name="numbers">
        {(fields, { add }) => (
          <>
            {fields.map((field) => (
              <Form.Item
                label="Masked Number"
                {...field}
                name={[field.name, 'value']}
                key={field.key}
              >
                <MaskedInput />
              </Form.Item>
            ))}

            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              Add Number
            </Button>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default MyForm;
