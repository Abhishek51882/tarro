// user.schema.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    avatar: {
        type: String,
        default: 'default-avatar.png'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    relationships: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending_outgoing', 'pending_incoming', 'accepted', 'rejected', 'blocked'],
            default: 'pending_outgoing'
        },
        requestedAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }],
    privacy: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Indexes for optimized querying
userSchema.index({ "relationships.user": 1, "relationships.status": 1 });
userSchema.index({ email: 1 });
userSchema.index({ name: 'text' });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;