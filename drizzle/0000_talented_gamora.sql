CREATE TABLE `internships` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`companyName` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	`type` enum('REMOTE','HYBRID','ON-SITE') NOT NULL DEFAULT 'REMOTE',
	`duration` varchar(100),
	`stipend` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `internships_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(36) NOT NULL,
	`userId` varchar(36) NOT NULL,
	`refreshToken` varchar(512) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `sessions_refreshToken_unique` UNIQUE(`refreshToken`)
);
--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;