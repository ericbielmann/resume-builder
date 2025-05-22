import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Linkedin, FileText, Briefcase, Building2, GraduationCap } from 'lucide-react';

interface ProfileData {
  name: string;
  title: string;
  company: string;
  bio: string;
  currentRole: {
    title: string;
    company: string;
    period: string;
    responsibilities: string[];
  };
}

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const [profile, setProfile] = useState<ProfileData>({
    name: "Frontend Developer & Technical Lead",
    title: "Frontend Developer & Technical Lead",
    company: "Halo Media LLC",
    bio: "With a professional career of over 10 years, I have specialized in frontend development and technical leadership of innovative projects. Currently, I serve as a Frontend Web Developer at Halo Media LLC, where my mission is to design and implement robust and scalable solutions that enhance the user experience in the construction industry.",
    currentRole: {
      title: "Technical Lead & Frontend Developer",
      company: "Halo Media LLC",
      period: "2023 - Present",
      responsibilities: [
        "Leading the technical development of the ticketing portfolio",
        "Implementing solutions using Next.js, React, Nest.js, and Docker",
        "Creating Progressive Web Apps (PWAs) for enhanced user experience",
        "Managing team organization and deployment across environments"
      ]
    }
  });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const updateResponsibility = (index: number, value: string) => {
    const newResponsibilities = [...profile.currentRole.responsibilities];
    newResponsibilities[index] = value;
    setProfile({
      ...profile,
      currentRole: {
        ...profile.currentRole,
        responsibilities: newResponsibilities
      }
    });
  };

  const addResponsibility = () => {
    setProfile({
      ...profile,
      currentRole: {
        ...profile.currentRole,
        responsibilities: [...profile.currentRole.responsibilities, ""]
      }
    });
  };

  const removeResponsibility = (index: number) => {
    const newResponsibilities = profile.currentRole.responsibilities.filter((_, i) => i !== index);
    setProfile({
      ...profile,
      currentRole: {
        ...profile.currentRole,
        responsibilities: newResponsibilities
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Professional Profile</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="text-2xl font-bold text-gray-900 w-full border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="text-gray-600 w-full border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="prose max-w-none">
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full h-32 text-gray-700 leading-relaxed border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </section>

            {/* Experience Section */}
            <section className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Current Role
              </h3>
              <div className="border-l-2 border-blue-500 pl-4">
                <input
                  type="text"
                  value={profile.currentRole.title}
                  onChange={(e) => setProfile({
                    ...profile,
                    currentRole: { ...profile.currentRole, title: e.target.value }
                  })}
                  className="font-medium text-gray-900 w-full border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={profile.currentRole.company}
                    onChange={(e) => setProfile({
                      ...profile,
                      currentRole: { ...profile.currentRole, company: e.target.value }
                    })}
                    className="text-gray-600 text-sm border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
                  />
                  <span className="text-gray-600 text-sm">•</span>
                  <input
                    type="text"
                    value={profile.currentRole.period}
                    onChange={(e) => setProfile({
                      ...profile,
                      currentRole: { ...profile.currentRole, period: e.target.value }
                    })}
                    className="text-gray-600 text-sm border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <ul className="mt-2 text-gray-700 space-y-2">
                  {profile.currentRole.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-gray-400">•</span>
                      <input
                        type="text"
                        value={responsibility}
                        onChange={(e) => updateResponsibility(index, e.target.value)}
                        className="flex-1 border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
                      />
                      <button
                        onClick={() => removeResponsibility(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={addResponsibility}
                  className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
                >
                  + Add Responsibility
                </button>
              </div>
            </section>
          </div>

          {/* Audio Recording Section */}
          <div className="lg:col-span-1">
            <section className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Audio Introduction</h3>
              <div className="space-y-4">
                <div className="flex justify-center">
                  {isRecording ? (
                    <button
                      onClick={stopRecording}
                      className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Square className="w-6 h-6" />
                    </button>
                  ) : (
                    <button
                      onClick={startRecording}
                      className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      <Mic className="w-6 h-6" />
                    </button>
                  )}
                </div>
                
                {audioURL && (
                  <div className="mt-4">
                    <audio controls className="w-full" src={audioURL}>
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                
                <div className="text-sm text-gray-600 text-center mt-2">
                  {isRecording ? 'Recording in progress...' : 'Click to record your introduction'}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn Profile
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Download CV
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;