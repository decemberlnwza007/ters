import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import AnimatedInput from '../Motion/AnimatedInput';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Car, LogIn } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Home');
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/Home');
    } catch (error) {
      console.error('Error logging in with Google: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-center">
          <Car className="mx-auto text-white mb-4" size={64} strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-white">เข้าสู่ระบบ</h2>
          <p className="text-blue-100">เริ่มการเดินทางของคุณ</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <AnimatedInput
            label='อีเมลล์'
            type="email"
            placeholder='กรอกอีเมลล์ของคุณ'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
            startContent={<LogIn className="text-gray-400" size={20} />}
          />
          
          <AnimatedInput
            label='รหัสผ่าน'
            type="password"
            value={password}
            placeholder='กรอกรหัสผ่าน'
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
            startContent={<LogIn className="text-gray-400" size={20} />}
          />
          
          <Button 
            type="submit" 
            color="primary" 
            fullWidth 
            className="mb-4"
            startContent={<LogIn size={20} />}
          >
            เข้าสู่ระบบ
          </Button>
          
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">หรือ</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <Button 
            onClick={handleGoogleSignIn} 
            color="default" 
            fullWidth 
            variant="bordered"
            // startContent={<Google size={20} />}
          >
            ล็อกอินด้วย Google
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-gray-600">
              ยังไม่มีบัญชีใช่หรือไม่? {' '}
              <Link to="/register" className="text-blue-600 font-bold hover:underline">
                สมัครเลย
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;