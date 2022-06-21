import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';

@Controller('events')
export class EventsController {
  private events: Event[] = [];

  @Get('/')
  findAll(): Array<object> {
    return this.events;
  }

  @Get('/:id')
  findOne(@Param('id') id) {
    return this.events.find((event: Event) => event.id === parseInt(id));
  }

  @Post()
  create(@Body() input: CreateEventDto) {
    const event: Event = {
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1,
    };

    this.events.push(event);

    return event;
  }

  @Patch('/:id')
  update(@Param('id') id, @Body() input: UpdateEventDto) {
    const index: number = this.events.findIndex(
      (event: Event) => event.id === parseInt(id),
    );

    this.events[index] = {
      ...this.events[index],
      ...input,
      when: input.when ? new Date(input.when) : this.events[index].when,
    };

    return this.events[index];
  }

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param('id') id) {
    this.events = this.events.filter(
      (event: Event) => event.id !== parseInt(id),
    );
  }
}
